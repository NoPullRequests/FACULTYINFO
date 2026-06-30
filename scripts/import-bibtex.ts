import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

/**
 * Simple BibTeX parser
 * Extracts publication entries and their fields
 */
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

/**
 * Map BibTeX publication type to our database enum
 */
function mapPublicationType(bibtexType: string): 'JOURNAL' | 'CONFERENCE' | 'BOOK' | 'BOOK_CHAPTER' | 'PATENT' | 'THESIS' | 'TECHNICAL_REPORT' | 'OTHER' {
  const typeMap: Record<string, any> = {
    'article': 'JOURNAL',
    'inproceedings': 'CONFERENCE',
    'conference': 'CONFERENCE',
    'book': 'BOOK',
    'incollection': 'BOOK_CHAPTER',
    'inbook': 'BOOK_CHAPTER',
    'phdthesis': 'THESIS',
    'mastersthesis': 'THESIS',
    'techreport': 'TECHNICAL_REPORT',
    'patent': 'PATENT',
    'misc': 'OTHER',
    'unpublished': 'OTHER',
  };
  
  return typeMap[bibtexType] || 'OTHER';
}

/**
 * Main import function
 */
async function importBibTeX(filePath: string) {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`);
      process.exit(1);
    }

    // Read BibTeX file
    const bibtexContent = fs.readFileSync(filePath, 'utf-8');
    console.log('📖 Reading BibTeX file...');
    console.log(`📄 File: ${path.basename(filePath)}\n`);
    
    // Parse entries
    const entries = parseBibTeX(bibtexContent);
    console.log(`✅ Found ${entries.length} publications\n`);
    
    if (entries.length === 0) {
      console.log('⚠️  No valid BibTeX entries found in file');
      return;
    }
    
    // Import to database
    let imported = 0;
    let skipped = 0;
    let errors = 0;
    
    for (const entry of entries) {
      try {
        // Basic validation
        if (!entry.title) {
          console.log(`⚠️  Skipping entry without title: ${entry.key}`);
          skipped++;
          continue;
        }

        // Check if publication already exists
        const existing = await prisma.publication.findFirst({
          where: {
            title: entry.title,
            year: parseInt(entry.year || '0')
          }
        });
        
        if (existing) {
          console.log(`⏭️  Already exists: ${entry.title.substring(0, 60)}...`);
          skipped++;
          continue;
        }
        
        // Prepare tags from keywords
        const tags: string[] = [];
        if (entry.keywords) {
          tags.push(...entry.keywords.split(/[,;]/).map((k: string) => k.trim()));
        }
        
        // Create publication
        const publication = await prisma.publication.create({
          data: {
            title: entry.title,
            authors: entry.author || 'Unknown',
            year: parseInt(entry.year || new Date().getFullYear().toString()),
            venue: entry.journal || entry.booktitle || entry.publisher || 'Unknown',
            type: mapPublicationType(entry.type),
            doi: entry.doi || null,
            abstract: entry.abstract || null,
            pdfUrl: entry.url || null,
            tags: tags,
            bibtex: `@${entry.type}{${entry.key},\n  title={${entry.title}},\n  author={${entry.author}},\n  year={${entry.year}}\n}`,
            featured: false,
          }
        });
        
        console.log(`✅ [${imported + 1}] ${entry.title.substring(0, 60)}...`);
        imported++;
        
      } catch (error: any) {
        console.error(`❌ Error importing: ${entry.title?.substring(0, 40) || entry.key}`);
        console.error(`   ${error.message}`);
        errors++;
      }
    }
    
    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 Import Summary:');
    console.log('='.repeat(60));
    console.log(`   ✅ Successfully Imported: ${imported}`);
    console.log(`   ⏭️  Skipped (duplicates):  ${skipped}`);
    console.log(`   ❌ Errors:                ${errors}`);
    console.log(`   📚 Total Entries:         ${entries.length}`);
    console.log('='.repeat(60));
    
    if (imported > 0) {
      console.log('\n🎉 Import completed successfully!');
      console.log('👉 Visit /admin/publications to review your publications');
    }
    
  } catch (error: any) {
    console.error('\n❌ Import failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Command line execution
const filePath = process.argv[2] || 'publications.bib';

console.log('\n' + '='.repeat(60));
console.log('📚 BibTeX Publication Import Tool');
console.log('='.repeat(60) + '\n');

importBibTeX(filePath);
