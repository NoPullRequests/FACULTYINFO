# Google Scholar Import Guide

## 📚 How to Import Publications from Google Scholar

This guide explains multiple methods to import publication data into your website.

---

## Method 1: BibTeX Export (Recommended)

### Step 1: Export from Google Scholar

1. Go to your Google Scholar profile
2. Select the publications you want to export
   - Click checkbox next to each publication, OR
   - Use "Select all" for bulk export
3. Click the "Export" button
4. Choose "BibTeX" format
5. Save the `.bib` file

### Step 2: Prepare the BibTeX File

Your BibTeX file will look like this:

```bibtex
@article{doe2024machine,
  title={Machine Learning Approaches for Data Analysis},
  author={Doe, John and Smith, Jane},
  journal={IEEE Transactions on Neural Networks},
  volume={35},
  number={4},
  pages={123--145},
  year={2024},
  publisher={IEEE},
  doi={10.1109/TNNLS.2024.1234567}
}

@inproceedings{doe2023deep,
  title={Deep Learning for Computer Vision},
  author={Doe, John},
  booktitle={Proceedings of CVPR},
  pages={1000--1010},
  year={2023},
  organization={IEEE}
}
```

### Step 3: Import Script

I'll create an import script for you. Save your BibTeX file as `publications.bib` in the root directory, then run:

```bash
npm run import:bibtex
```

---

## Method 2: CSV Import

### Step 1: Create a CSV File

Create a spreadsheet with these columns:

| Title | Authors | Year | Venue | Type | DOI | Abstract | PDF_URL | Tags |
|-------|---------|------|-------|------|-----|----------|---------|------|
| Machine Learning... | John Doe, Jane Smith | 2024 | IEEE TNNLS | journal | 10.1109/... | This paper... | https://... | ML,AI |
| Deep Learning... | John Doe | 2023 | CVPR | conference | 10.1109/... | We present... | https://... | CV,DL |

### Step 2: Export as CSV

Save the spreadsheet as `publications.csv`

### Step 3: Import Script

```bash
npm run import:csv publications.csv
```

---

## Method 3: Manual Entry via Admin Panel

For small numbers of publications (< 20):

1. Go to `/admin/publications`
2. Click "Add Publication"
3. Fill in the form:
   - **Title:** Full publication title
   - **Authors:** Comma-separated (e.g., "John Doe, Jane Smith")
   - **Year:** Publication year
   - **Venue:** Journal/Conference name
   - **Type:** Select from dropdown (journal, conference, book, patent)
   - **DOI:** Digital Object Identifier (optional)
   - **Abstract:** Brief description
   - **PDF URL:** Link to full text (optional)
   - **Tags:** Comma-separated keywords
4. Click "Save"

---

## Method 4: API Integration (Advanced)

### Using Scholarly Library

For automatic updates, we can integrate the Scholarly Python library:

```python
from scholarly import scholarly

# Search for author
search_query = scholarly.search_author('John Doe')
author = scholarly.fill(next(search_query))

# Get publications
publications = []
for pub in author['publications']:
    pub_filled = scholarly.fill(pub)
    publications.append({
        'title': pub_filled['bib']['title'],
        'authors': pub_filled['bib']['author'],
        'year': pub_filled['bib'].get('pub_year'),
        'venue': pub_filled['bib'].get('venue'),
        'abstract': pub_filled['bib'].get('abstract'),
        'citations': pub_filled.get('num_citations', 0)
    })
```

---

## Import Script Implementation

Let me create the actual import scripts for you:

### BibTeX Import Script

File: `scripts/import-bibtex.ts`

```typescript
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

// Simple BibTeX parser
function parseBibTeX(bibtex: string) {
  const entries: any[] = [];
  const entryRegex = /@(\w+)\{([^,]+),\s*([\s\S]*?)\n\}/g;
  
  let match;
  while ((match = entryRegex.exec(bibtex)) !== null) {
    const [, type, key, content] = match;
    
    const fields: any = { type: type.toLowerCase(), key };
    const fieldRegex = /(\w+)\s*=\s*\{([^}]+)\}/g;
    
    let fieldMatch;
    while ((fieldMatch = fieldRegex.exec(content)) !== null) {
      const [, fieldName, fieldValue] = fieldMatch;
      fields[fieldName.toLowerCase()] = fieldValue.trim();
    }
    
    entries.push(fields);
  }
  
  return entries;
}

// Map BibTeX type to our enum
function mapPublicationType(bibtexType: string): string {
  const typeMap: Record<string, string> = {
    'article': 'JOURNAL',
    'inproceedings': 'CONFERENCE',
    'book': 'BOOK',
    'incollection': 'BOOK_CHAPTER',
    'phdthesis': 'THESIS',
    'mastersthesis': 'THESIS',
    'techreport': 'TECHNICAL_REPORT',
    'patent': 'PATENT',
  };
  
  return typeMap[bibtexType] || 'OTHER';
}

async function importBibTeX(filePath: string) {
  try {
    // Read BibTeX file
    const bibtexContent = fs.readFileSync(filePath, 'utf-8');
    console.log('📖 Reading BibTeX file...');
    
    // Parse entries
    const entries = parseBibTeX(bibtexContent);
    console.log(`✅ Found ${entries.length} publications`);
    
    // Import to database
    let imported = 0;
    let skipped = 0;
    
    for (const entry of entries) {
      try {
        // Check if publication already exists
        const existing = await prisma.publication.findFirst({
          where: {
            title: entry.title,
            year: parseInt(entry.year || '0')
          }
        });
        
        if (existing) {
          console.log(`⏭️  Skipping: ${entry.title} (already exists)`);
          skipped++;
          continue;
        }
        
        // Create publication
        await prisma.publication.create({
          data: {
            title: entry.title || 'Untitled',
            authors: entry.author || 'Unknown',
            year: parseInt(entry.year || new Date().getFullYear().toString()),
            venue: entry.journal || entry.booktitle || entry.publisher || 'Unknown',
            type: mapPublicationType(entry.type),
            doi: entry.doi || null,
            abstract: entry.abstract || null,
            pdfUrl: entry.url || null,
            tags: entry.keywords ? entry.keywords.split(',').map((k: string) => k.trim()) : [],
            bibtex: `@${entry.type}{${entry.key},\n  title={${entry.title}},\n  author={${entry.author}},\n  year={${entry.year}}\n}`,
            featured: false,
          }
        });
        
        console.log(`✅ Imported: ${entry.title}`);
        imported++;
        
      } catch (error) {
        console.error(`❌ Error importing: ${entry.title}`, error);
      }
    }
    
    console.log('\n📊 Import Summary:');
    console.log(`   ✅ Imported: ${imported}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   📚 Total: ${entries.length}`);
    
  } catch (error) {
    console.error('❌ Import failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run import
const filePath = process.argv[2] || 'publications.bib';
importBibTeX(filePath);
```

### CSV Import Script

File: `scripts/import-csv.ts`

```typescript
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

function parseCSV(csvContent: string) {
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const entries = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    const entry: any = {};
    
    headers.forEach((header, index) => {
      entry[header.toLowerCase()] = values[index];
    });
    
    entries.push(entry);
  }
  
  return entries;
}

async function importCSV(filePath: string) {
  try {
    const csvContent = fs.readFileSync(filePath, 'utf-8');
    console.log('📖 Reading CSV file...');
    
    const entries = parseCSV(csvContent);
    console.log(`✅ Found ${entries.length} publications`);
    
    let imported = 0;
    let skipped = 0;
    
    for (const entry of entries) {
      try {
        const existing = await prisma.publication.findFirst({
          where: {
            title: entry.title,
            year: parseInt(entry.year || '0')
          }
        });
        
        if (existing) {
          console.log(`⏭️  Skipping: ${entry.title}`);
          skipped++;
          continue;
        }
        
        await prisma.publication.create({
          data: {
            title: entry.title || 'Untitled',
            authors: entry.authors || 'Unknown',
            year: parseInt(entry.year || new Date().getFullYear().toString()),
            venue: entry.venue || 'Unknown',
            type: entry.type?.toUpperCase() || 'OTHER',
            doi: entry.doi || null,
            abstract: entry.abstract || null,
            pdfUrl: entry.pdf_url || null,
            tags: entry.tags ? entry.tags.split(';').map((t: string) => t.trim()) : [],
            featured: false,
          }
        });
        
        console.log(`✅ Imported: ${entry.title}`);
        imported++;
        
      } catch (error) {
        console.error(`❌ Error importing: ${entry.title}`, error);
      }
    }
    
    console.log('\n📊 Import Summary:');
    console.log(`   ✅ Imported: ${imported}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   📚 Total: ${entries.length}`);
    
  } catch (error) {
    console.error('❌ Import failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

const filePath = process.argv[2] || 'publications.csv';
importCSV(filePath);
```

---

## Adding Import Commands to package.json

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "import:bibtex": "tsx scripts/import-bibtex.ts",
    "import:csv": "tsx scripts/import-csv.ts"
  }
}
```

---

## Usage Examples

### Import BibTeX
```bash
# Default file (publications.bib)
npm run import:bibtex

# Custom file
npm run import:bibtex path/to/my-papers.bib
```

### Import CSV
```bash
# Default file (publications.csv)
npm run import:csv

# Custom file
npm run import:csv path/to/my-papers.csv
```

---

## Data Quality Tips

### For Best Results

1. **Clean Author Names**
   - Use consistent format: "FirstName LastName"
   - Separate multiple authors with commas
   - Example: "John Doe, Jane Smith, Bob Johnson"

2. **Standardize Venue Names**
   - Use full conference/journal names
   - Be consistent with abbreviations
   - Example: "IEEE Transactions on Neural Networks and Learning Systems"

3. **Include DOIs When Possible**
   - DOIs make papers easier to find
   - Format: `10.1109/TNNLS.2024.1234567`

4. **Add Meaningful Tags**
   - Use 3-5 tags per publication
   - Be consistent with terminology
   - Example: "Machine Learning, Deep Learning, Computer Vision"

5. **Abstracts**
   - Keep under 300 words
   - Focus on key contributions
   - Avoid special characters

---

## Troubleshooting

### "Publication already exists"
The script checks for duplicates by title and year. If you want to re-import:
1. Delete the duplicate from admin panel
2. Run import again

### BibTeX parsing errors
- Ensure proper formatting with matched braces `{}`
- Check for special characters (use LaTeX escapes if needed)
- Validate your BibTeX file online first

### CSV import issues
- Ensure UTF-8 encoding
- Use double quotes for fields with commas
- Check column names match exactly

### Missing fields
- Required fields: title, authors, year, venue
- Optional fields will be set to null
- Type defaults to "OTHER" if not specified

---

## After Import

1. **Review Publications**
   - Go to `/admin/publications`
   - Check all entries imported correctly
   - Edit any missing information

2. **Set Featured Publications**
   - Mark 3-5 publications as "featured"
   - These will appear on the homepage

3. **Add PDF Links**
   - Upload PDFs to cloud storage
   - Add URLs to each publication

4. **Organize with Tags**
   - Review and standardize tags
   - Add missing tags
   - Fix any typos

---

## Automated Updates (Future Enhancement)

To keep publications automatically synchronized with Google Scholar:

1. **Set up cron job** (weekly/monthly)
2. **Run import script** automatically
3. **Send email notification** of new publications
4. **Review and approve** via admin panel

This requires:
- Scholarly API integration
- Scheduled job runner (GitHub Actions, Vercel Cron)
- Email service (Resend, SendGrid)

---

## Need Help?

### Common Questions

**Q: Can I import from DBLP?**
A: Yes! DBLP provides BibTeX export. Use the BibTeX import method.

**Q: What about ResearchGate?**
A: Export publications as BibTeX from ResearchGate, then use our import script.

**Q: Can I import citations count?**
A: Not directly, but we can add this field and integrate Google Scholar API.

**Q: How do I handle conference vs journal?**
A: Set the "type" field correctly in your CSV/BibTeX for proper categorization.

---

## Ready to Import?

1. Choose your method (BibTeX recommended)
2. Prepare your file
3. Run the import script
4. Review in admin panel
5. Publish!

---

*For the import scripts to work, I need to create the actual script files. Let me know when you're ready to provide the Google Scholar data!*
