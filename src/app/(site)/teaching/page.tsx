import { BookOpen, FlaskConical } from "lucide-react";

import { FadeIn } from "@/components/ui/fade-in";
import { getCourses } from "@/lib/content";
import { CourseCard } from "@/components/sections/course-card";

// Course materials mapped by course name — dummy links from Stanford/MIT/NPTEL
const courseMaterials: Record<string, { label: string; url: string; type: "notes" | "slides" | "video" | "exercises" }[]> = {
  "Machine Learning": [
    { label: "Lecture Notes (Stanford CS229)", url: "https://cs229.stanford.edu/notes/", type: "notes" },
    { label: "Course Slides (Stanford CS229)", url: "https://cs229.stanford.edu/syllabus-autumn2018.html", type: "slides" },
    { label: "Video Lectures (Andrew Ng — Coursera)", url: "https://www.coursera.org/learn/machine-learning", type: "video" },
    { label: "Problem Sets", url: "https://cs229.stanford.edu/problem-sets/", type: "exercises" },
  ],
  "Deep Learning": [
    { label: "Course Notes (Stanford CS231n)", url: "https://cs231n.github.io/", type: "notes" },
    { label: "Lecture Slides (Stanford CS231n)", url: "https://cs231n.stanford.edu/slides/", type: "slides" },
    { label: "Video Lectures (Stanford CS231n)", url: "https://www.youtube.com/playlist?list=PL3FW7Lu3i5JvHM8ljYj-zLfQRF3EO8sYv", type: "video" },
    { label: "Assignments", url: "https://cs231n.github.io/assignments2024/assignment1/", type: "exercises" },
  ],
  "Data Science": [
    { label: "MIT OCW — Intro to Computational Thinking & Data Science", url: "https://ocw.mit.edu/courses/6-0002-introduction-to-computational-thinking-and-data-science-fall-2016/", type: "notes" },
    { label: "NPTEL — Data Science for Engineers (IIT Madras)", url: "https://nptel.ac.in/courses/106106179", type: "video" },
    { label: "Lecture Slides", url: "https://ocw.mit.edu/courses/6-0002-introduction-to-computational-thinking-and-data-science-fall-2016/pages/lecture-slides-and-files/", type: "slides" },
  ],
  "Database Management Systems": [
    { label: "MIT OCW — Database Systems (6.830)", url: "https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/", type: "notes" },
    { label: "NPTEL — DBMS (IIT Kharagpur)", url: "https://nptel.ac.in/courses/106105175", type: "video" },
    { label: "Lecture Notes", url: "https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/pages/readings/", type: "slides" },
  ],
  "Discrete Structures": [
    { label: "MIT OCW — Mathematics for CS (6.042J)", url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/", type: "notes" },
    { label: "Lecture Slides", url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/pages/lecture-slides/", type: "slides" },
    { label: "Problem Sets", url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/pages/assignments/", type: "exercises" },
  ],
  "Introduction to AI and ML": [
    { label: "MIT OCW — Artificial Intelligence (6.034)", url: "https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/", type: "notes" },
    { label: "Video Lectures (MIT 6.034)", url: "https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/video_galleries/lecture-videos/", type: "video" },
    { label: "NPTEL — Intro to AI & ML (IIT Madras)", url: "https://nptel.ac.in/courses/106106126", type: "video" },
  ],
  "Software Engineering": [
    { label: "MIT OCW — Software Construction (6.005)", url: "https://ocw.mit.edu/courses/6-005-software-construction-spring-2016/", type: "notes" },
    { label: "NPTEL — Software Engineering (IIT Kharagpur)", url: "https://nptel.ac.in/courses/106105182", type: "video" },
    { label: "Readings & Notes", url: "https://ocw.mit.edu/courses/6-005-software-construction-spring-2016/pages/readings/", type: "slides" },
  ],
  "AI and ML Laboratory": [
    { label: "Stanford CS229 — Programming Exercises", url: "https://cs229.stanford.edu/problem-sets/", type: "exercises" },
    { label: "ML Lab Notebooks (Google Colab)", url: "https://colab.research.google.com/github/ageron/handson-ml3/blob/main/", type: "exercises" },
  ],
  "Data Science Laboratory": [
    { label: "MIT OCW — Lab Materials", url: "https://ocw.mit.edu/courses/6-0002-introduction-to-computational-thinking-and-data-science-fall-2016/pages/assignments/", type: "exercises" },
    { label: "Kaggle Learn — Data Science", url: "https://www.kaggle.com/learn", type: "exercises" },
  ],
  "Database Engineering Laboratory": [
    { label: "MIT OCW — DBMS Lab Assignments", url: "https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/pages/assignments/", type: "exercises" },
    { label: "Stanford DB — Lab Exercises", url: "https://cs145-fa22.github.io/", type: "exercises" },
  ],
  "Deep Learning Laboratory": [
    { label: "CS231n Assignments", url: "https://cs231n.github.io/assignments2024/assignment1/", type: "exercises" },
    { label: "Fast.ai Practical Deep Learning", url: "https://course.fast.ai/", type: "video" },
  ],
  "Machine Learning Laboratory": [
    { label: "Stanford CS229 Lab Exercises", url: "https://cs229.stanford.edu/problem-sets/", type: "exercises" },
    { label: "Scikit-learn Tutorials", url: "https://scikit-learn.org/stable/tutorial/", type: "notes" },
  ],
  "Operating Systems Laboratory": [
    { label: "MIT OCW — OS Lab (6.828)", url: "https://ocw.mit.edu/courses/6-828-operating-system-engineering-fall-2012/", type: "exercises" },
    { label: "NPTEL — OS Lab (IIT Bombay)", url: "https://nptel.ac.in/courses/106101183", type: "video" },
  ],
  "Product Development Laboratory": [
    { label: "MIT OCW — Product Design (2.009)", url: "https://ocw.mit.edu/courses/2-009-the-product-engineering-process-fall-2011/", type: "notes" },
  ],
  "Programming for Problem Solving": [
    { label: "MIT OCW — Introduction to Programming (6.0001)", url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/", type: "notes" },
    { label: "Video Lectures", url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/video_galleries/lecture-videos/", type: "video" },
  ],
  "Software Engineering Laboratory": [
    { label: "MIT OCW — SE Lab Materials", url: "https://ocw.mit.edu/courses/6-005-software-construction-spring-2016/pages/problem-sets/", type: "exercises" },
    { label: "NPTEL — SE Lab", url: "https://nptel.ac.in/courses/106105182", type: "video" },
  ],
};

export default async function TeachingPage() {
  const courses = await getCourses();
  const theory = courses.filter((c) => c.type === "Theory");
  const practical = courses.filter((c) => c.type === "Lab");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="border-b border-border pb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Teaching</h1>
          <p className="mt-2 text-muted-foreground">
            Courses taught at NIT Rourkela and previous institutions. Click any course to view and download materials.
          </p>
        </div>
      </FadeIn>

      {/* Theory */}
      <section className="mt-12">
        <FadeIn>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <BookOpen className="size-5 text-primary" aria-hidden />
            Theory Courses
            <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-sm font-normal text-muted-foreground">
              {theory.length}
            </span>
          </h2>
        </FadeIn>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {theory.map((course, i) => (
            <FadeIn key={course.name} delay={i * 40} direction="up" threshold={0.04}>
              <CourseCard
                name={course.name}
                materials={courseMaterials[course.name] ?? []}
                variant="theory"
              />
            </FadeIn>
          ))}
        </ul>
      </section>

      {/* Laboratory */}
      <section className="mt-12">
        <FadeIn>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <FlaskConical className="size-5 text-primary" aria-hidden />
            Laboratory Courses
            <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-sm font-normal text-muted-foreground">
              {practical.length}
            </span>
          </h2>
        </FadeIn>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {practical.map((course, i) => (
            <FadeIn key={course.name} delay={i * 40} direction="up" threshold={0.04}>
              <CourseCard
                name={course.name}
                materials={courseMaterials[course.name] ?? []}
                variant="lab"
              />
            </FadeIn>
          ))}
        </ul>
      </section>

      <FadeIn delay={200}>
        <p className="mt-12 text-sm text-muted-foreground">
          Course materials are sourced from MIT OpenCourseWare, Stanford, and NPTEL as reference resources. 
          Official syllabi and lecture notes from NIT Rourkela will be added after content review.
        </p>
      </FadeIn>
    </div>
  );
}
