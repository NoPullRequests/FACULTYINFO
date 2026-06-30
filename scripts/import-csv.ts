/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

/**
 * Parse CSV file into structured data
 * Handles quoted fields and commas within fields
 */
function parseCSV(csvContent: string): any[] {
  const lines = csvContent.split('\n');
  
  if (lines.length < 2) {
    throw new Error('CSV file must have at least a header row and one data row');
  }
  
  // Parse header
  const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().trim());
  console.log(`📋 Detected columns: ${headers.join(', ')}\n`);
  
  const entries = [];
  
  // Parse data rows
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // Skip empty lines
    
    try {
      const values = parseCSVLine(line);
      const entry: any = {};
      
      headers.forEach((header, index) => {
        entry[header] = values[index]?.trim() || '';
      });
      
      // Only add if title exists
      if (entry.title) {
        entries.push(entry);
      }
    } catch (error) {
      console.warn(`⚠️  Skipping malformed line ${i + 1}`);
    }
  }
  
  return entries;
}

/**
 * Parse a single CSV line, handling quoted fields
 */
function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let currentField = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        currentField += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      fields.push(currentField);
      currentField = '';
    } else {
      currentField += char;
    }
  }
  
  // Add last field
  fields.push(currentField);
  
  return fields.map(f => f.trim());
}

/**
 * Map publication type string to database enum
 */
function mapPublicationType(typeString: string): 'JOURNAL' | 'CONFERENCE' | 'BOOK' | 'BOOK_CHAPTER' | 'PATENT' | 'THESIS' | 'TECHNICAL_REPORT' | 'OTHER' {
  const normalized = typeString.toUpperCase().trim();
  
  const typeMap: Record<string, any> = {
    'JOURNAL': 'JOURNAL',
    'CONFERENCE': 'CONFERENCE',
    'BOOK': 'BOOK',
    'BOOK_CHAPTER': 'BOOK_CHAPTER',
    'BOOK CHAPTER': 'BOOK_CHAPTER',
    'PATENT': 'PATENT',
    'THESIS': 'THESIS',
    'PHD': 'THESIS',
    'MASTERS': 'THESIS',
    'TECHNICAL_REPORT': 'TECHNICAL_REPORT',
    'TECHNICAL REPORT': 'TECHNICAL_REPORT',
    'REPORT': 'TECHNICAL_REPORT',
    'OTHER': 'OTHER',
  };
  
  return typeMap[normalized] || 'OTHER';
}

/**
 * Main import function
 */
async function importCSV(filePath: string) {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`);
      console.log('\n💡 Tip: Make sure your CSV file is in the project root directory');
      process.exit(1);
    }

    // Read CSV file
    const csvContent = fs.readFileSync(filePath, 'utf-8');
    console.log('📖 Reading CSV file...');
    console.log(`📄 File: ${path.basename(filePath)}\n`);
    
    // Parse CSV
    const entries = parseCSV(csvContent);
    console.log(`✅ Found ${entries.length} valid publications\n`);
    
    if (entries.length === 0) {
      console.log('⚠️  No valid entries found in CSV file');
      console.log('\n💡 Required columns: title, authors, year, venue');
      return;
    }
    
    // Import to database
    let imported = 0;
    let skipped = 0;
    let errors = 0;
    
    for (const entry of entries) {
      try {
        // Validate required fields
        if (!entry.title || !entry.year) {
          console.log(`⚠️  Skipping entry without title or year`);
          skipped++;
          continue;
        }

        // Check if publication already exists
        const existing = await prisma.publication.findFirst({
          where: {
            title: entry.title,
            year: parseInt(entry.year)
          }
        });
        
        if (existing) {
          console.log(`⏭️  Already exists: ${entry.title.substring(0, 60)}...`);
          skipped++;
          continue;
        }
        
        // Parse tags
        const tags: string[] = [];
        if (entry.tags) {
          // Support both comma and semicolon separators
          tags.push(...entry.tags.split(/[,;]/).map((t: string) => t.trim()).filter(Boolean));
        }
        
        // Create publication
        await prisma.publication.create({
          data: {
            id: `pub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: entry.title,
            authors: entry.authors || 'Unknown',
            year: parseInt(entry.year),
            venue: entry.venue || 'Unknown',
            type: mapPublicationType(entry.type || 'OTHER'),
            doi: entry.doi || null,
            abstract: entry.abstract || null,
            pdfUrl: entry.pdf_url || entry.pdfurl || entry.url || null,
            tags: tags,
            bibtex: null,
            featured: false,
          }
        });
        
        console.log(`✅ [${imported + 1}] ${entry.title.substring(0, 60)}...`);
        imported++;
        
      } catch (error: any) {
        console.error(`❌ Error importing: ${entry.title?.substring(0, 40) || 'Unknown'}`);
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
    
    if (errors > 0) {
      console.log('\n⚠️  Some entries could not be imported. Check the errors above.');
    }
    
  } catch (error: any) {
    console.error('\n❌ Import failed:', error.message);
    console.log('\n💡 CSV Format Example:');
    console.log('Title,Authors,Year,Venue,Type,DOI,Abstract,PDF_URL,Tags');
    console.log('"Paper Title","John Doe, Jane Smith",2024,"IEEE TNNLS",journal,10.1109/...,Abstract text,https://...,ML;AI');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Command line execution
const filePath = process.argv[2] || 'publications.csv';

console.log('\n' + '='.repeat(60));
console.log('📊 CSV Publication Import Tool');
console.log('='.repeat(60) + '\n');

importCSV(filePath);
