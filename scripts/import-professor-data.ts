/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function importProfessorData() {
  console.log('🎓 Importing Dr. Prasenjit Dey\'s data...\n');

  try {
    // 1. Update admin user with professor's email
    console.log('📧 Updating admin account...');
    const hashedPassword = await bcrypt.hash('changeme123', 10);
    
    await prisma.user.upsert({
      where: { email: 'prasenjitdey13@gmail.com' },
      create: {
        email: 'prasenjitdey13@gmail.com',
        name: 'Dr. Prasenjit Dey',
        password: hashedPassword,
        isActive: true,
      },
      update: {
        name: 'Dr. Prasenjit Dey',
        password: hashedPassword,
        isActive: true,
      },
    });
    console.log('✓ Admin account updated with: prasenjitdey13@gmail.com\n');

    // 2. Update site settings
    console.log('⚙️  Updating site settings...');
    await prisma.siteSettings.upsert({
      where: { id: 'default' },
      create: {
        id: 'default',
        shortBio: 'Dr. Prasenjit Dey is an Assistant Professor in the Department of Computer Science and Engineering at NIT Rourkela. His research focuses on machine learning, deep learning, neural networks, and AI applications in healthcare, surveillance, and IoT systems.',
        longBio: `Dr. Prasenjit Dey is currently working as an Assistant Professor in the Department of Computer Science and Engineering at the National Institute of Technology (NIT) Rourkela, Odisha, India. He received his B.Tech. from West Bengal University of Technology in 2010, followed by an M.Tech. and Ph.D. in Computer Science and Engineering from NIT Durgapur in 2012 and 2018, respectively.

Prior to joining NIT Rourkela, he held positions at Intel as a Hardware Graphics Designer and served as an Assistant Professor at Cooch Behar Government Engineering College.

His research interests span artificial neural networks, machine learning, pattern recognition, deep learning, IoT system design, data visualization, and feature engineering. Dr. Dey has successfully completed a government-funded project and is actively involved in several others. He has published extensively, with more than 35 research papers in reputed international journals such as IEEE Transactions on Systems, Man, and Cybernetics, IEEE Transactions on Artificial Intelligence, IEEE Internet of Things Journal, Pattern Recognition, Applied Soft Computing, Biomedical Signal Processing and Control, and Information Sciences, as well as numerous conference proceedings and edited book chapters.

In addition to his strong research profile, Dr. Dey brings exceptional skills in program development, student mentoring, interdisciplinary collaboration, and effective scientific communication.`,
        researchGroup: 'Vision Intelligence Lab',
        researchInterests: [
          'Machine Learning',
          'Deep Learning',
          'Neural Networks',
          'Pattern Recognition',
          'Computer Vision',
          'IoT Systems',
          'Data Science',
          'Explainable AI'
        ],
        stats: {
          publications: 35,
          citations: 280,
          hIndex: 8,
          students: 5,
          projects: 2
        },
        education: [
          {
            degree: 'Ph.D. in Computer Science and Engineering',
            institution: 'NIT Durgapur',
            year: '2018',
            thesis: 'Designing Neural Network Algorithms for Better Performance Analysis'
          },
          {
            degree: 'M.Tech. in Computer Science and Engineering',
            institution: 'NIT Durgapur',
            year: '2012'
          },
          {
            degree: 'B.Tech.',
            institution: 'West Bengal University of Technology',
            year: '2010'
          }
        ],
        experience: [
          {
            position: 'Assistant Professor',
            organization: 'National Institute of Technology Rourkela',
            duration: 'July 2023 - Present',
            description: 'Teaching and research in Machine Learning, Deep Learning, and AI'
          },
          {
            position: 'Assistant Professor',
            organization: 'Coochbehar Government Engineering College',
            duration: 'June 2018 - July 2023',
            description: 'Teaching various CS courses including Machine Learning, Computer Architecture, and Operating Systems'
          },
          {
            position: 'Hardware Graphics Engineer',
            organization: 'Intel Corporation',
            duration: 'February 2017 - June 2018',
            description: '3D graphics and media designing'
          },
          {
            position: 'Research Scholar',
            organization: 'NIT Durgapur',
            duration: 'December 2012 - June 2018',
            description: 'Research activities and teaching'
          }
        ],
        awards: [
          {
            title: '2nd Runner-Up in CMPDI Hackathon on Research and Development',
            year: '2025',
            organization: 'CMPDI'
          },
          {
            title: 'Qualified NET',
            year: '2012',
            organization: 'UGC'
          },
          {
            title: 'Qualified GATE',
            year: '2010',
            organization: 'IIT'
          }
        ],
        publicationTotalCount: 35,
        citations: 280
      },
      update: {
        shortBio: 'Dr. Prasenjit Dey is an Assistant Professor in the Department of Computer Science and Engineering at NIT Rourkela. His research focuses on machine learning, deep learning, neural networks, and AI applications in healthcare, surveillance, and IoT systems.',
        longBio: `Dr. Prasenjit Dey is currently working as an Assistant Professor in the Department of Computer Science and Engineering at the National Institute of Technology (NIT) Rourkela, Odisha, India. He received his B.Tech. from West Bengal University of Technology in 2010, followed by an M.Tech. and Ph.D. in Computer Science and Engineering from NIT Durgapur in 2012 and 2018, respectively.

Prior to joining NIT Rourkela, he held positions at Intel as a Hardware Graphics Designer and served as an Assistant Professor at Cooch Behar Government Engineering College.

His research interests span artificial neural networks, machine learning, pattern recognition, deep learning, IoT system design, data visualization, and feature engineering. Dr. Dey has successfully completed a government-funded project and is actively involved in several others. He has published extensively, with more than 35 research papers in reputed international journals such as IEEE Transactions on Systems, Man, and Cybernetics, IEEE Transactions on Artificial Intelligence, IEEE Internet of Things Journal, Pattern Recognition, Applied Soft Computing, Biomedical Signal Processing and Control, and Information Sciences, as well as numerous conference proceedings and edited book chapters.

In addition to his strong research profile, Dr. Dey brings exceptional skills in program development, student mentoring, interdisciplinary collaboration, and effective scientific communication.`,
        researchGroup: 'Vision Intelligence Lab',
        researchInterests: [
          'Machine Learning',
          'Deep Learning',
          'Neural Networks',
          'Pattern Recognition',
          'Computer Vision',
          'IoT Systems',
          'Data Science',
          'Explainable AI'
        ],
        stats: {
          publications: 35,
          citations: 280,
          hIndex: 8,
          students: 5,
          projects: 2
        },
        publicationTotalCount: 35,
        citations: 280
      }
    });
    console.log('✓ Site settings updated\n');

    console.log('✅ Professor data import complete!\n');
    console.log('═══════════════════════════════════════');
    console.log('📧 Admin Login: prasenjitdey13@gmail.com');
    console.log('🔒 Password: changeme123');
    console.log('⚠️  IMPORTANT: Change password after first login!');
    console.log('═══════════════════════════════════════\n');
    console.log('🔗 Next steps:');
    console.log('   1. Import publications from Google Scholar');
    console.log('   2. Add student information via admin panel');
    console.log('   3. Add course information via admin panel');
    console.log('   4. Add project details via admin panel');
    console.log('   5. Upload professional photo');
    console.log('\n📝 Google Scholar: https://scholar.google.com/citations?user=Z46lTvcAAAAJ');

  } catch (error) {
    console.error('❌ Error importing data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run import
importProfessorData();
