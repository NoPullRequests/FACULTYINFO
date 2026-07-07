import { FadeIn } from "@/components/ui/fade-in";
import { DownloadsList } from "@/components/sections/downloads-list";
import { siteConfig } from "@/config/site";
import { getDownloads } from "@/lib/content";

const externalResources = [
  { title: "Google Scholar Profile",    description: "Full publication list and citation metrics", href: siteConfig.scholarUrl },
  { title: "ORCID Profile",             description: "Verified research profile and works",         href: siteConfig.orcidUrl ?? "#" },
  { title: "NIT Rourkela Faculty Page", description: "Official institutional profile",             href: siteConfig.facultyPageUrl },
];

export default async function DownloadsPage() {
  const dbDownloads = await getDownloads();

  // Always include CV at the top
  const cvEntry = {
    id:          "cv",
    title:       "Curriculum Vitae (CV)",
    description: "Full academic CV with publications, projects, teaching, and awards",
    fileUrl:     "/cv/Prasenjit_Dey_CV.pdf",
    fileType:    "PDF",
    fileSize:    null,
    category:    "Academic",
    course:      null,
  };

  // Static course material resources (external links to open courseware)
  const courseResources = [
    {
      id:          "dl-ml-notes",
      title:       "Machine Learning — Lecture Notes (Stanford CS229)",
      description: "Comprehensive ML lecture notes covering supervised/unsupervised learning, SVMs, and neural networks by Andrew Ng.",
      fileUrl:     "https://cs229.stanford.edu/lectures/cs229-notes1.pdf",
      fileType:    "PDF",
      fileSize:    null,
      category:    "Lecture Notes",
      course:      "Machine Learning",
    },
    {
      id:          "dl-ml-syllabus",
      title:       "Machine Learning — Course Page (Stanford CS229)",
      description: "Full syllabus, problem sets, and additional reading materials for Stanford's Machine Learning course.",
      fileUrl:     "https://cs229.stanford.edu/",
      fileType:    "HTML",
      fileSize:    null,
      category:    "Lecture Notes",
      course:      "Machine Learning",
    },
    {
      id:          "dl-deeplearning-notes",
      title:       "Deep Learning — Course Notes (Stanford CS231n)",
      description: "Lecture notes on convolutional neural networks for visual recognition, covering CNNs, RNNs, and optimization.",
      fileUrl:     "https://cs231n.stanford.edu/",
      fileType:    "HTML",
      fileSize:    null,
      category:    "Lecture Notes",
      course:      "Deep Learning",
    },
    {
      id:          "dl-deeplearning-syllabus",
      title:       "Deep Learning — Syllabus & Slides (Stanford CS231n)",
      description: "Slides and assignments for Stanford's deep learning for computer vision course.",
      fileUrl:     "https://cs231n.github.io/",
      fileType:    "HTML",
      fileSize:    null,
      category:    "Lecture Notes",
      course:      "Deep Learning",
    },
    {
      id:          "dl-ds-mit",
      title:       "Data Science — Introduction to Computational Thinking and Data Science (MIT OCW)",
      description: "MIT 6.0002 course materials covering data analysis, simulation, and machine learning fundamentals in Python.",
      fileUrl:     "https://ocw.mit.edu/courses/6-0002-introduction-to-computational-thinking-and-data-science-fall-2016/",
      fileType:    "HTML",
      fileSize:    null,
      category:    "Lecture Notes",
      course:      "Data Science",
    },
    {
      id:          "dl-ds-nptel",
      title:       "Data Science — NPTEL Course (IIT Madras)",
      description: "NPTEL lecture series on data science covering statistics, exploratory analysis, and predictive modelling.",
      fileUrl:     "https://nptel.ac.in/courses/106106179",
      fileType:    "HTML",
      fileSize:    null,
      category:    "Lecture Notes",
      course:      "Data Science",
    },
    {
      id:          "dl-dbms-mit",
      title:       "Database Management Systems — Lecture Notes (MIT OCW 6.830)",
      description: "MIT 6.830 Database Systems lecture notes covering relational algebra, query optimisation, transactions, and recovery.",
      fileUrl:     "https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/",
      fileType:    "HTML",
      fileSize:    null,
      category:    "Lecture Notes",
      course:      "Database Management Systems",
    },
    {
      id:          "dl-dbms-nptel",
      title:       "Database Management Systems — NPTEL Course (IIT Kharagpur)",
      description: "NPTEL video lectures and notes on DBMS including SQL, normalisation, indexing, and concurrency control.",
      fileUrl:     "https://nptel.ac.in/courses/106105175",
      fileType:    "HTML",
      fileSize:    null,
      category:    "Lecture Notes",
      course:      "Database Management Systems",
    },
    {
      id:          "dl-discrete-mit",
      title:       "Discrete Structures — Mathematics for Computer Science (MIT OCW 6.042J)",
      description: "MIT 6.042J course materials on logic, proofs, sets, combinatorics, graph theory, and probability.",
      fileUrl:     "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/",
      fileType:    "HTML",
      fileSize:    null,
      category:    "Lecture Notes",
      course:      "Discrete Structures",
    },
    {
      id:          "dl-discrete-notes-pdf",
      title:       "Discrete Structures — Lecture Notes PDF (MIT OCW 6.042J)",
      description: "Downloadable PDF lecture notes for MIT's Mathematics for Computer Science course.",
      fileUrl:     "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/pages/readings/",
      fileType:    "HTML",
      fileSize:    null,
      category:    "Lecture Notes",
      course:      "Discrete Structures",
    },
    {
      id:          "dl-aiml-mit",
      title:       "Introduction to AI and ML — Artificial Intelligence (MIT OCW 6.034)",
      description: "MIT 6.034 course materials covering search, constraint propagation, learning, and neural networks.",
      fileUrl:     "https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/",
      fileType:    "HTML",
      fileSize:    null,
      category:    "Lecture Notes",
      course:      "Introduction to AI and ML",
    },
    {
      id:          "dl-aiml-nptel",
      title:       "Introduction to AI and ML — NPTEL Course (IIT Madras)",
      description: "NPTEL introductory course on artificial intelligence and machine learning fundamentals.",
      fileUrl:     "https://nptel.ac.in/courses/106106126",
      fileType:    "HTML",
      fileSize:    null,
      category:    "Lecture Notes",
      course:      "Introduction to AI and ML",
    },
    {
      id:          "dl-se-mit",
      title:       "Software Engineering — Software Construction (MIT OCW 6.005)",
      description: "MIT 6.005 course materials on software construction, covering safety, clarity, changeability, and testing.",
      fileUrl:     "https://ocw.mit.edu/courses/6-005-software-construction-spring-2016/",
      fileType:    "HTML",
      fileSize:    null,
      category:    "Lecture Notes",
      course:      "Software Engineering",
    },
    {
      id:          "dl-se-nptel",
      title:       "Software Engineering — NPTEL Course (IIT Kharagpur)",
      description: "NPTEL lecture series on software engineering covering SDLC, UML, design patterns, and testing methodologies.",
      fileUrl:     "https://nptel.ac.in/courses/106105182",
      fileType:    "HTML",
      fileSize:    null,
      category:    "Lecture Notes",
      course:      "Software Engineering",
    },
  ];

  const allDownloads = [cvEntry, ...courseResources, ...dbDownloads.filter(d => d.id !== "cv")];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="border-b border-border pb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Downloads</h1>
          <p className="mt-2 text-muted-foreground">
            CV, lecture notes, slides, datasets, and other resources.
          </p>
        </div>
      </FadeIn>

      <div className="mt-10">
        <DownloadsList
          downloads={allDownloads}
          externalResources={externalResources}
        />
      </div>
    </div>
  );
}
