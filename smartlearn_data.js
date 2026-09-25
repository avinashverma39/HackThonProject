/**
 * SmartLearn — Core Data Model & Mock Repository
 * Project: SmartLearn | Team: HACKSMITH | Theme: Smart Education (SIH 2026)
 * Prepared for Java / Spring Boot + MySQL Database REST API integration
 */

const SmartLearnData = (function () {
  // Current logged in user state
  const currentUser = {
    id: "stu-101",
    name: "Alex Rivera",
    email: "alex.rivera@smartlearn.edu",
    role: "student", // 'student' | 'teacher'
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    college: "Institute of Engineering & Technology",
    semester: "Semester 5 (Computer Science)",
    streakDays: 12,
    overallProgress: 72,
    quizAverage: 78,
    enrolledCoursesCount: 6,
    completedLessons: 48,
    pendingQuizzes: 3,
    studyHoursThisWeek: 18.5
  };

  const currentTeacher = {
    id: "tch-201",
    name: "Prof. Sarah Jenkins",
    email: "s.jenkins@smartlearn.edu",
    role: "teacher",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    department: "Department of Computer Science & Engineering",
    totalStudents: 248,
    activeCourses: 6,
    totalQuizzes: 18,
    averagePerformance: 74.6,
    studentsNeedingSupport: 14
  };

  // 1. Subjects Catalog
  const subjects = [
    {
      id: "subj-c",
      code: "CS101",
      name: "C Programming",
      category: "Programming Core",
      icon: "code",
      color: "from-blue-600 to-indigo-600",
      accent: "#3b82f6",
      description: "Foundations of procedural programming, memory pointers, struct arrays, and file I/O operations.",
      progress: 88,
      lessonsCount: 24,
      quizzesCount: 6,
      practiceCount: 85,
      level: "Beginner to Intermediate"
    },
    {
      id: "subj-cpp",
      code: "CS102",
      name: "C++ & Object-Oriented Programming",
      category: "Programming Core",
      icon: "terminal",
      color: "from-cyan-600 to-blue-600",
      accent: "#06b6d4",
      description: "Classes, operator overloading, polymorphism, templates, and Standard Template Library (STL) fundamentals.",
      progress: 74,
      lessonsCount: 28,
      quizzesCount: 7,
      practiceCount: 92,
      level: "Intermediate"
    },
    {
      id: "subj-dsa",
      code: "CS201",
      name: "Data Structures & Algorithms",
      category: "Core Computer Science",
      icon: "account_tree",
      color: "from-indigo-600 to-purple-600",
      accent: "#6366f1",
      description: "Linear and non-linear data structures, Big-O asymptotic analysis, recursion, trees, graphs, and dynamic programming.",
      progress: 68,
      lessonsCount: 36,
      quizzesCount: 9,
      practiceCount: 140,
      level: "Intermediate to Advanced"
    },
    {
      id: "subj-java",
      code: "CS202",
      name: "Java Programming",
      category: "Software Engineering",
      icon: "coffee",
      color: "from-amber-600 to-orange-600",
      accent: "#f59e0b",
      description: "Object-oriented design, JVM internals, Collections Framework, multithreading, and enterprise backend fundamentals.",
      progress: 82,
      lessonsCount: 30,
      quizzesCount: 8,
      practiceCount: 110,
      level: "Intermediate"
    },
    {
      id: "subj-dbms",
      code: "CS301",
      name: "Database Management Systems",
      category: "Data Engineering",
      icon: "database",
      color: "from-emerald-600 to-teal-600",
      accent: "#10b981",
      description: "Relational algebra, SQL query optimization, ER modeling, normalization forms (1NF–BCNF), and ACID transactions.",
      progress: 76,
      lessonsCount: 26,
      quizzesCount: 6,
      practiceCount: 75,
      level: "Intermediate"
    },
    {
      id: "subj-web",
      code: "CS302",
      name: "Web Development",
      category: "Full Stack Development",
      icon: "language",
      color: "from-violet-600 to-pink-600",
      accent: "#a855f7",
      description: "Modern HTML5 semantic architecture, CSS3 Grid/Flexbox, JavaScript ES6+, RESTful APIs, and responsive design.",
      progress: 91,
      lessonsCount: 32,
      quizzesCount: 8,
      practiceCount: 95,
      level: "All Levels"
    }
  ];

  // 2. Courses (Curriculum Units)
  const courses = [
    {
      id: "course-dsa",
      subjectId: "subj-dsa",
      title: "Mastering Data Structures & Algorithmic Patterns",
      instructor: "Prof. Sergey Levine",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      progress: 68,
      totalLessons: 36,
      completedLessons: 24,
      difficulty: "Intermediate",
      rating: 4.9,
      studentsEnrolled: 1420,
      modules: [
        {
          title: "Module 1: Complexity Analysis & Pointers",
          lessons: ["Big-O, Big-Theta, Big-Omega notation", "Memory Layout & Pointer Arithmetic", "Space vs Time Tradeoffs"]
        },
        {
          title: "Module 2: Linked Lists & Two-Pointer Patterns",
          lessons: ["Singly vs Doubly Linked Lists", "Floyd's Cycle-Finding Algorithm", "Reversing Linked Lists in-place"]
        },
        {
          title: "Module 3: Trees, Heaps & Binary Search",
          lessons: ["Binary Search Tree Invariants", "Tree Traversal: DFS & BFS", "Heap Construction & Priority Queues"]
        },
        {
          title: "Module 4: Dynamic Programming & Backtracking",
          lessons: ["Memoization vs Tabulation", "0/1 Knapsack Problem", "Coin Change & Longest Common Subsequence"]
        }
      ]
    },
    {
      id: "course-c",
      subjectId: "subj-c",
      title: "C Systems Programming & Memory Architecture",
      instructor: "Dr. Richard Stallman",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      progress: 88,
      totalLessons: 24,
      completedLessons: 21,
      difficulty: "Beginner",
      rating: 4.8,
      studentsEnrolled: 2150,
      modules: [
        {
          title: "Module 1: Syntax, Types & Control Flow",
          lessons: ["Data Types & Storage Classes", "Branching & Iteration Patterns", "Bitwise Operations"]
        },
        {
          title: "Module 2: Pointers, Arrays & Dynamic Allocation",
          lessons: ["Pointer De-referencing & Void Pointers", "malloc(), calloc(), realloc(), free()", "Pointer to Functions"]
        }
      ]
    },
    {
      id: "course-dbms",
      subjectId: "subj-dbms",
      title: "Relational Database Design & SQL Optimization",
      instructor: "Prof. Jennifer Widom",
      thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80",
      progress: 76,
      totalLessons: 26,
      completedLessons: 20,
      difficulty: "Intermediate",
      rating: 4.9,
      studentsEnrolled: 1890,
      modules: [
        {
          title: "Module 1: Relational Algebra & ER Diagrams",
          lessons: ["Entity-Relationship Modeling", "Relational Keys: Candidate, Primary, Foreign", "Relational Algebra Operations"]
        },
        {
          title: "Module 2: Normalization & Query Tuning",
          lessons: ["1NF, 2NF, 3NF and BCNF Functional Dependencies", "Indexing: B-Trees and Hash Indexing", "ACID Transactions & Concurrency Control"]
        }
      ]
    },
    {
      id: "course-java",
      subjectId: "subj-java",
      title: "Java Enterprise Architecture & Spring Boot",
      instructor: "Dr. Venkat Subramaniam",
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      progress: 82,
      totalLessons: 30,
      completedLessons: 25,
      difficulty: "Intermediate",
      rating: 4.85,
      studentsEnrolled: 1670,
      modules: [
        {
          title: "Module 1: Modern Java & JVM Internals",
          lessons: ["Memory Management & Garbage Collection", "Generics & Java Collections", "Streams & Lambda Expressions"]
        },
        {
          title: "Module 2: Spring Boot REST Architecture",
          lessons: ["Dependency Injection & Inversion of Control", "Spring Data JPA & Hibernate Mapping", "RESTful Controller Design & Validation"]
        }
      ]
    },
    {
      id: "course-cpp",
      subjectId: "subj-cpp",
      title: "Modern C++20 & STL Systems Design",
      instructor: "Prof. Bjarne Stroustrup",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      progress: 74,
      totalLessons: 28,
      completedLessons: 21,
      difficulty: "Intermediate",
      rating: 4.78,
      studentsEnrolled: 1340,
      modules: [
        {
          title: "Module 1: Object-Oriented Principles",
          lessons: ["Constructors, Destructors & RAII", "Virtual Tables & Dynamic Binding", "Operator Overloading"]
        },
        {
          title: "Module 2: Standard Template Library (STL)",
          lessons: ["Vectors, Deques, Lists & Maps", "Iterators and Algorithms", "Smart Pointers: unique_ptr, shared_ptr"]
        }
      ]
    },
    {
      id: "course-web",
      subjectId: "subj-web",
      title: "Modern Full-Stack Web Architecture",
      instructor: "Dr. Angela Yu",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      progress: 91,
      totalLessons: 32,
      completedLessons: 29,
      difficulty: "All Levels",
      rating: 4.95,
      studentsEnrolled: 3100,
      modules: [
        {
          title: "Module 1: Responsive Layouts & Design Systems",
          lessons: ["CSS Grid & Flexbox Mastery", "Mobile-First Adaptive Design", "Design Tokens & Typography Scales"]
        },
        {
          title: "Module 2: Asynchronous JS & API Integration",
          lessons: ["Promises, Async/Await & Fetch API", "DOM Manipulation & Component State", "JWT Authentication Flow"]
        }
      ]
    }
  ];

  // 3. Study Materials (Notes, PDFs, Cheatsheets, Questions)
  const studyMaterials = [
    {
      id: "mat-1",
      subjectId: "subj-dsa",
      subjectName: "Data Structures",
      title: "DSA Algorithmic Patterns & Big-O Cheatsheet",
      type: "pdf", // 'notes' | 'pdf' | 'document' | 'questions'
      badge: "Verified Notes",
      size: "3.2 MB",
      author: "Dept. of Computer Science",
      downloads: 4120,
      description: "Comprehensive 24-page guide detailing time & space complexity, recursion trees, and master theorem formulations.",
      content: `# Data Structures & Algorithmic Patterns

## 1. Asymptotic Complexity Reference
- **Constant Time $O(1)$**: Hash table lookup, array index lookup, stack push/pop.
- **Logarithmic Time $O(\\log n)$**: Binary search on sorted arrays, balanced BST operations.
- **Linear Time $O(n)$**: Single pass array traversal, linked list search.
- **Linearithmic Time $O(n \\log n)$**: Merge Sort, Quick Sort (average), Heap Sort.
- **Quadratic Time $O(n^2)$**: Nested loops, Bubble sort, Insertion sort.

## 2. Pointers & Two-Pointer Pattern
When scanning arrays or palindromes, two pointers moving inwards or at different speeds ($2x$ fast and $1x$ slow) reduce $O(n^2)$ algorithms to $O(n)$.

\`\`\`python
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False
\`\`\`
`
    },
    {
      id: "mat-2",
      subjectId: "subj-c",
      title: "C Pointers, Double Pointers & Dynamic Memory Architecture",
      type: "notes",
      badge: "Professor Notes",
      size: "1.8 MB",
      author: "Prof. Sarah Jenkins",
      downloads: 3280,
      description: "Visual breakdown of heap vs stack memory allocation, pointer arithmetic, void pointers, and avoiding segmentation faults.",
      content: `# C Pointers & Memory Architecture

## Memory Segments in C
1. **Code Segment (Text)**: Read-only executable instructions.
2. **Data Segment**: Initialized global and static variables.
3. **BSS Segment**: Uninitialized global and static variables.
4. **Stack Segment**: Function stack frames, local variables, return addresses.
5. **Heap Segment**: Dynamically allocated memory via \`malloc\`, \`calloc\`, \`realloc\`.

### Dynamic Allocation Safeguard
Always verify that the returned pointer from \`malloc\` is not NULL before de-referencing:

\`\`\`c
int *arr = (int *)malloc(n * sizeof(int));
if (arr == NULL) {
    fprintf(stderr, "Memory allocation failed\\n");
    exit(EXIT_FAILURE);
}
// Free after use
free(arr);
arr = NULL; // Prevent dangling pointer
\`\`\`
`
    },
    {
      id: "mat-3",
      subjectId: "subj-dbms",
      title: "DBMS Relational Normalization & SQL Query Tuning",
      type: "pdf",
      badge: "High-Yield Guide",
      size: "2.4 MB",
      author: "Prof. Jennifer Widom",
      downloads: 2850,
      description: "Step-by-step algorithms to decompose relations into 1NF, 2NF, 3NF, and BCNF without losing functional dependencies.",
      content: `# Relational Normalization Framework

## Functional Dependencies (FD)
An FD $\\alpha \\rightarrow \\beta$ states that whenever two tuples have equal $\\alpha$ values, their $\\beta$ values must also agree.

## Normal Forms Hierarchy
1. **1NF**: Every attribute domain consists exclusively of atomic (indivisible) values.
2. **2NF**: Relation is in 1NF and contains no partial functional dependency (non-prime attributes depend fully on the candidate key).
3. **3NF**: Relation is in 2NF and contains no transitive functional dependency. For every non-trivial FD $X \\rightarrow Y$, either $X$ is a superkey or $Y$ is a prime attribute.
4. **BCNF (Boyce-Codd)**: For every non-trivial FD $X \\rightarrow Y$, $X$ must be a superkey.
`
    },
    {
      id: "mat-4",
      subjectId: "subj-java",
      title: "Java Collections Framework & Multithreading Guide",
      type: "document",
      badge: "Cheatsheet",
      size: "2.1 MB",
      author: "Dr. Venkat Subramaniam",
      downloads: 2190,
      description: "In-depth comparison of ArrayList, LinkedList, HashMap, ConcurrentHashMap, and Java 21 Virtual Threads.",
      content: `# Java Collections & Concurrency Architecture

## Collections Framework Map
- **List Interface**: \`ArrayList\` ($O(1)$ lookup, dynamic array) vs \`LinkedList\` ($O(1)$ head/tail insertion).
- **Set Interface**: \`HashSet\` (hash-table backed, $O(1)$) vs \`TreeSet\` (Red-Black Tree, sorted, $O(\\log n)$).
- **Map Interface**: \`HashMap\` (buckets with collision chaining/treeification) vs \`ConcurrentHashMap\` (lock striping / CAS operations).

\`\`\`java
// Thread-safe map usage
Map<String, Integer> wordCounts = new ConcurrentHashMap<>();
wordCounts.merge("algorithm", 1, Integer::sum);
\`\`\`
`
    },
    {
      id: "mat-5",
      subjectId: "subj-cpp",
      title: "C++ STL Containers, Iterators & Lambda Expressions",
      type: "notes",
      badge: "Verified Notes",
      size: "1.9 MB",
      author: "Dept. of Computer Science",
      downloads: 1940,
      description: "Clear guide to std::vector, std::map, std::unordered_map, custom comparators, and modern C++ auto lambdas.",
      content: `# C++ Standard Template Library Guide

## Container Selection Matrix
- Contiguous storage with fast random access: \`std::vector\`
- Fast front & back insertion: \`std::deque\`
- Unique sorted keys with logarithmic search: \`std::map\`
- Key-value pairs with average $O(1)$ lookup: \`std::unordered_map\`
`
    },
    {
      id: "mat-6",
      subjectId: "subj-web",
      title: "REST API Design Standards & JSON Web Token Security",
      type: "questions",
      badge: "Practice Questions",
      size: "1.5 MB",
      author: "Dr. Angela Yu",
      downloads: 3410,
      description: "Top 50 University and Industry interview questions on HTTP methods, status codes, CORS, and stateless JWT sessions.",
      content: `# REST API & Web Security Interview Questions

## Core Topics
1. Explain idempotency: Why are GET, PUT, and DELETE idempotent while POST is not?
2. How does the JWT structure (Header.Payload.Signature) ensure tamper-resistance without database lookup?
3. What is the Cross-Origin Resource Sharing (CORS) preflight request (OPTIONS method)?
`
    }
  ];

  // 4. Video Learning Library
  const videos = [
    {
      id: "vid-1",
      subjectId: "subj-dsa",
      title: "Binary Search Mastery & Edge Invariant Analysis",
      instructor: "Prof. Sergey Levine",
      duration: "24:15",
      totalSec: 1455,
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      progress: 65,
      completed: false,
      chapters: [
        { time: 0, label: "00:00 Introduction to Divide and Conquer" },
        { time: 240, label: "04:00 Search Space Invariants: low <= high" },
        { time: 615, label: "10:15 Overflow Prevention: mid = low + (high - low) / 2" },
        { time: 940, label: "15:40 Finding Lower Bound & Upper Bound" }
      ],
      description: "Learn how to never write a buggy binary search again. We analyze search space shrink invariants and boundary conditions."
    },
    {
      id: "vid-2",
      subjectId: "subj-c",
      title: "Pointers & Dynamic Memory Deconstruction in C",
      instructor: "Dr. Richard Stallman",
      duration: "28:40",
      totalSec: 1720,
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      progress: 100,
      completed: true,
      chapters: [
        { time: 0, label: "00:00 Stack vs Heap Memory Allocation" },
        { time: 360, label: "06:00 Pointer Dereferencing & Addresses" },
        { time: 820, label: "13:40 Void Pointers & Typecasting" },
        { time: 1300, label: "21:40 Memory Leaks & Valgrind Analysis" }
      ],
      description: "Visual step-by-step breakdown of how memory addresses are mapped in hardware and how C interacts directly with RAM."
    },
    {
      id: "vid-3",
      subjectId: "subj-dbms",
      title: "SQL Query Optimization & Database Indexing Internals",
      instructor: "Prof. Jennifer Widom",
      duration: "32:10",
      totalSec: 1930,
      thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      progress: 40,
      completed: false,
      chapters: [
        { time: 0, label: "00:00 Why Table Scans Kill Performance" },
        { time: 420, label: "07:00 B+ Tree Index Architecture" },
        { time: 980, label: "16:20 Clustered vs Non-Clustered Indexes" },
        { time: 1510, label: "25:10 Reading EXPLAIN Plans in MySQL" }
      ],
      description: "Understand how relational database engines execute SQL statements and how B+ Tree indices optimize retrieval."
    },
    {
      id: "vid-4",
      subjectId: "subj-java",
      title: "Spring Boot RESTful Microservices & Architecture",
      instructor: "Dr. Venkat Subramaniam",
      duration: "35:50",
      totalSec: 2150,
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      progress: 0,
      completed: false,
      chapters: [
        { time: 0, label: "00:00 Spring Architecture & IoC Container" },
        { time: 540, label: "09:00 Creating REST Controllers & Endpoints" },
        { time: 1200, label: "20:00 Spring Data JPA & Repository Pattern" },
        { time: 1800, label: "30:00 Exception Handling with @ControllerAdvice" }
      ],
      description: "Build clean, production-ready enterprise REST APIs using Java, Spring Boot, Spring Data JPA, and MySQL."
    }
  ];

  // 5. Interactive Quizzes with Granular Topic Tags
  const quizzes = [
    {
      id: "quiz-dsa-1",
      subjectId: "subj-dsa",
      subjectName: "Data Structures",
      title: "Core Data Structures & Algorithmic Patterns Quiz",
      durationMinutes: 10,
      totalQuestions: 5,
      difficulty: "Intermediate",
      passingScore: 70,
      lastAttempt: {
        score: 4,
        total: 5,
        percentage: 80,
        completedAt: "2 days ago"
      },
      questions: [
        {
          id: "q1",
          topic: "Pointers",
          question: "What is the worst-case time complexity of searching for an element in an unsorted singly linked list of size n?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          correctIndex: 2,
          explanation: "In a singly linked list, elements are not stored in contiguous memory. To locate an element in the worst case, one must traverse from head to tail sequentially, which takes O(n) operations."
        },
        {
          id: "q2",
          topic: "Arrays",
          question: "Which of the following array operations takes O(1) constant time regardless of array length?",
          options: [
            "Accessing an element at index i",
            "Inserting an element at the beginning",
            "Searching for a value in an unsorted array",
            "Deleting an element from the middle"
          ],
          correctIndex: 0,
          explanation: "Arrays offer direct random access via memory address arithmetic: Address = BaseAddress + (index * ElementSize), completing in O(1) time."
        },
        {
          id: "q3",
          topic: "Functions",
          question: "In recursion, what condition must be satisfied to prevent a StackOverflowError?",
          options: [
            "The function must be static",
            "A base case must be reached with termination criteria",
            "The return type must be void",
            "The memory must be allocated on the heap"
          ],
          correctIndex: 1,
          explanation: "A recursive function pushes stack frames onto the call stack. Without a valid base case that stops further recursive calls, the stack will exhaust available memory, throwing a StackOverflowError."
        },
        {
          id: "q4",
          topic: "Pointers",
          question: "What is the time complexity of detecting a cycle in a linked list using Floyd's Tortoise and Hare algorithm?",
          options: ["O(n^2) time and O(n) space", "O(n) time and O(1) auxiliary space", "O(log n) time and O(1) space", "O(n log n) time and O(n) space"],
          correctIndex: 1,
          explanation: "Floyd's algorithm uses two pointers (slow moving 1 step, fast moving 2 steps). If a cycle exists, the fast pointer catches the slow pointer within at most n steps using O(1) extra space."
        },
        {
          id: "q5",
          topic: "Loops",
          question: "What is the time complexity of two nested loops where the outer runs n times and the inner runs from 1 to i?",
          options: ["O(n)", "O(n log n)", "O(n^2)", "O(2^n)"],
          correctIndex: 2,
          explanation: "The total iterations equal 1 + 2 + 3 + ... + n = n(n+1)/2 = (n^2 + n)/2, which simplifies asymptotically to O(n^2)."
        }
      ]
    },
    {
      id: "quiz-c-1",
      subjectId: "subj-c",
      subjectName: "C Programming",
      title: "Pointers, Memory Allocation & Structs Assessment",
      durationMinutes: 12,
      totalQuestions: 5,
      difficulty: "Intermediate",
      passingScore: 70,
      lastAttempt: {
        score: 3,
        total: 5,
        percentage: 60,
        completedAt: "Yesterday"
      },
      questions: [
        {
          id: "qc1",
          topic: "Pointers",
          question: "What happens when you dereference a dangling pointer in C?",
          options: [
            "It automatically reallocates memory",
            "Undefined Behavior (often segmentation fault)",
            "The compiler sets the pointer to NULL",
            "Memory is automatically cleared"
          ],
          correctIndex: 1,
          explanation: "A dangling pointer points to memory that has already been deallocated. Dereferencing it leads to Undefined Behavior and frequently results in a segmentation fault."
        },
        {
          id: "qc2",
          topic: "Pointers",
          question: "Which function dynamically allocates memory in C and initializes all bytes to zero?",
          options: ["malloc()", "calloc()", "realloc()", "alloc_zero()"],
          correctIndex: 1,
          explanation: "Unlike malloc() which leaves allocated memory uninitialized (containing garbage values), calloc(num, size) zeroes out all allocated memory."
        },
        {
          id: "qc3",
          topic: "Loops",
          question: "In C, which loop structure is guaranteed to execute its loop body at least once?",
          options: ["while loop", "for loop", "do-while loop", "nested loop"],
          correctIndex: 2,
          explanation: "In a do-while loop, the loop body executes first, and the condition is evaluated at the end of the iteration."
        },
        {
          id: "qc4",
          topic: "Functions",
          question: "What is passed when an array name is passed to a function in C?",
          options: [
            "A complete copy of the array elements",
            "A pointer to the first element of the array",
            "The length of the array",
            "A read-only copy"
          ],
          correctIndex: 1,
          explanation: "In C, array names decay into a pointer to their first element (&arr[0]) when passed as function arguments."
        },
        {
          id: "qc5",
          topic: "Pointers",
          question: "What is the size of a pointer variable on a standard 64-bit operating system?",
          options: ["2 bytes", "4 bytes", "8 bytes", "16 bytes"],
          correctIndex: 2,
          explanation: "On modern 64-bit architectures, memory addresses are 64 bits wide, which corresponds to 8 bytes regardless of the pointed-to data type."
        }
      ]
    },
    {
      id: "quiz-dbms-1",
      subjectId: "subj-dbms",
      subjectName: "Database Management",
      title: "Normalization & SQL Query Optimization Quiz",
      durationMinutes: 10,
      totalQuestions: 4,
      difficulty: "Intermediate",
      passingScore: 75,
      lastAttempt: null,
      questions: [
        {
          id: "qdb1",
          topic: "Normalization",
          question: "A relation is in Third Normal Form (3NF) if it is in 2NF and contains no:",
          options: ["Primary keys", "Transitive functional dependencies", "Atomic attributes", "Foreign keys"],
          correctIndex: 1,
          explanation: "3NF eliminates transitive dependencies where a non-prime attribute depends on another non-prime attribute."
        },
        {
          id: "qdb2",
          topic: "Transactions",
          question: "What property of ACID ensures that transactions are committed permanently even in case of system power failure?",
          options: ["Atomicity", "Consistency", "Isolation", "Durability"],
          correctIndex: 3,
          explanation: "Durability guarantees that once a transaction commits, its state persists across system crashes, usually via write-ahead logging (WAL)."
        },
        {
          id: "qdb3",
          topic: "Indexing",
          question: "Why do relational databases prefer B+ Trees over standard Binary Search Trees for disk storage?",
          options: [
            "B+ Trees have higher height",
            "B+ Trees have high fan-out, reducing expensive disk I/O seeks",
            "Binary Search Trees cannot store numbers",
            "B+ Trees only work in memory"
          ],
          correctIndex: 1,
          explanation: "B+ Trees have very large fan-out factors (each node stores hundreds of keys), keeping tree height extremely shallow (3-4 levels) and minimizing disk head seeks."
        },
        {
          id: "qdb4",
          topic: "SQL Queries",
          question: "Which clause is used in SQL to filter records after aggregation with GROUP BY?",
          options: ["WHERE", "HAVING", "ORDER BY", "FILTER"],
          correctIndex: 1,
          explanation: "WHERE filters rows before aggregation, while HAVING filters grouped rows after aggregation."
        }
      ]
    }
  ];

  // 6. Weak Topics System — Data & Continuous Performance Analysis
  // Alex's detected topic breakdown:
  // Arrays: 85%, Loops: 92%, Functions: 61%, Pointers: 48%
  const weakTopics = [
    {
      id: "wt-pointers",
      topic: "Pointers & Memory References",
      subjectId: "subj-c",
      subjectName: "C Programming & DSA",
      currentScore: 48,
      benchmarkTarget: 75,
      difficulty: "High",
      improvementRequired: "Critical (+27% needed)",
      errorPattern: "Frequent confusion between pointer dereference (*ptr) and address-of (&var), dangling pointers, and double pointer syntax.",
      recommendedAction: "Review Lecture Notes on Memory Allocation, watch the 14-minute Pointer Deconstruction video, and attempt the 5-question targeted drill.",
      relatedMaterialId: "mat-2",
      relatedVideoId: "vid-2",
      relatedQuizId: "quiz-c-1",
      practiceTopicKey: "Pointers"
    },
    {
      id: "wt-functions",
      topic: "Recursive Functions & Call Stack Invariants",
      subjectId: "subj-dsa",
      subjectName: "Data Structures & Algorithms",
      currentScore: 61,
      benchmarkTarget: 80,
      difficulty: "Medium",
      improvementRequired: "Moderate (+19% needed)",
      errorPattern: "Incomplete recurrence relations and stack frame tracking during multi-branch recursion.",
      recommendedAction: "Review Master Theorem notes, trace recursion trees on paper, and solve 3 tree traversal practice drills.",
      relatedMaterialId: "mat-1",
      relatedVideoId: "vid-1",
      relatedQuizId: "quiz-dsa-1",
      practiceTopicKey: "Functions"
    },
    {
      id: "wt-normalization",
      topic: "Database Normalization (BCNF vs 3NF)",
      subjectId: "subj-dbms",
      subjectName: "Database Management Systems",
      currentScore: 58,
      benchmarkTarget: 75,
      difficulty: "High",
      improvementRequired: "Moderate (+17% needed)",
      errorPattern: "Identifying dependency preservation when decomposing into Boyce-Codd Normal Form.",
      recommendedAction: "Study the Normalization cheatsheet and complete the 4-step decomposition exercise.",
      relatedMaterialId: "mat-3",
      relatedVideoId: "vid-3",
      relatedQuizId: "quiz-dbms-1",
      practiceTopicKey: "Normalization"
    }
  ];

  // 7. Personalized Recommendations Engine
  const recommendations = [
    {
      id: "rec-1",
      type: "remediation",
      badge: "High Priority",
      resourceType: "Notes & Flashcards",
      title: "Pointers & Memory Architecture Deep Dive",
      subject: "C Programming",
      reason: "Recommended because your recent quiz performance in Pointers is 48% (below your 75% target score).",
      difficulty: "Intermediate",
      estimatedTime: "15 mins",
      materialId: "mat-2",
      ctaText: "Study Material",
      actionType: "open_material"
    },
    {
      id: "rec-2",
      type: "video",
      badge: "Concept Reinforcement",
      resourceType: "Video Walkthrough",
      title: "Pointer Dereferencing & Dynamic Memory in Hardware",
      subject: "C Programming",
      reason: "Recommended to provide visual intuition for pointer addresses and heap memory frames.",
      difficulty: "Intermediate",
      estimatedTime: "28 mins",
      videoId: "vid-2",
      ctaText: "Watch Video",
      actionType: "open_video"
    },
    {
      id: "rec-3",
      type: "practice",
      badge: "Targeted Drill",
      resourceType: "Adaptive Practice",
      title: "Pointers & Pointer Arithmetic: 10 Practice Questions",
      subject: "C Programming",
      reason: "Practicing immediately after reviewing notes raises concept retention by up to 64%.",
      difficulty: "Medium",
      estimatedTime: "12 mins",
      practiceTopic: "Pointers",
      ctaText: "Start Practice",
      actionType: "start_practice"
    },
    {
      id: "rec-4",
      type: "quiz",
      badge: "Skill Validation",
      resourceType: "Interactive Quiz",
      title: "Retake Pointers & Dynamic Memory Assessment",
      subject: "C Programming",
      reason: "Validates your mastery improvement once you complete the practice questions.",
      difficulty: "Intermediate",
      estimatedTime: "10 mins",
      quizId: "quiz-c-1",
      ctaText: "Take Quiz",
      actionType: "open_quiz"
    }
  ];

  // 8. Practice Question Bank (Topic-specific, multi-difficulty)
  const practiceQuestionBank = {
    Pointers: [
      {
        question: "What does the expression `*ptr = *ptr + 1` accomplish in C?",
        options: [
          "It increments the memory address stored in ptr",
          "It increments the value stored at the memory location pointed to by ptr",
          "It allocates new memory",
          "It causes a compilation error"
        ],
        correctIndex: 1,
        difficulty: "Easy",
        explanation: "`*ptr` accesses the value at the address. Adding 1 increments that referenced value in-place."
      },
      {
        question: "If `int arr[5] = {10, 20, 30, 40, 50}; int *p = arr;`, what is `*(p + 3)`?",
        options: ["10", "30", "40", "Address of 40"],
        correctIndex: 2,
        difficulty: "Medium",
        explanation: "`p + 3` evaluates to the address of the 4th element (index 3). Dereferencing with `*` gives the value 40."
      },
      {
        question: "What is a `void*` pointer in C and C++?",
        options: [
          "A pointer that points to nothing (always NULL)",
          "A generic pointer that can point to any data type without type-specific arithmetic",
          "A pointer that can only point to void functions",
          "An illegal syntax in ANSI C"
        ],
        correctIndex: 1,
        difficulty: "Hard",
        explanation: "`void*` represents an untyped pointer. It can hold any object address but cannot be directly dereferenced without an explicit type cast."
      }
    ],
    Arrays: [
      {
        question: "In an array stored in row-major order, how are multidimensional elements ordered in memory?",
        options: [
          "Column by column",
          "Row by row sequentially",
          "Diagonally",
          "Randomly indexed via hash table"
        ],
        correctIndex: 1,
        difficulty: "Easy",
        explanation: "Row-major order (standard in C, C++, and Java) stores all elements of row 0, followed by row 1, and so forth in contiguous memory."
      },
      {
        question: "Given a sorted array of 1,000,000 items, what is the maximum number of comparisons Binary Search takes?",
        options: ["1,000,000", "500,000", "20", "100"],
        correctIndex: 2,
        difficulty: "Medium",
        explanation: "$\\lceil \\log_2(1,000,000) \\rceil \\approx 20$. In 20 comparisons, binary search resolves 1 million sorted elements."
      }
    ],
    Functions: [
      {
        question: "What is tail recursion and why is it beneficial?",
        options: [
          "Recursion where the recursive call is the final operation in the function, allowing compiler stack frame reuse",
          "Recursion that only runs at the end of the program",
          "Recursion with multiple base cases",
          "Recursion that consumes twice as much stack space"
        ],
        correctIndex: 0,
        difficulty: "Hard",
        explanation: "In tail-recursive functions, no work remains after the recursive call returns. Compliant compilers optimize this into a loop, running in $O(1)$ stack space."
      }
    ],
    Loops: [
      {
        question: "How many times does the loop `for (int i = 1; i <= 32; i *= 2)` execute?",
        options: ["32 times", "5 times", "6 times", "Infinite times"],
        correctIndex: 2,
        difficulty: "Easy",
        explanation: "Values of i are: 1, 2, 4, 8, 16, 32. That is exactly 6 executions."
      }
    ]
  };

  // 9. Teacher Roster & Student Performance Monitoring
  const teacherStudents = [
    {
      id: "stu-101",
      name: "Alex Rivera",
      email: "alex.rivera@smartlearn.edu",
      course: "Data Structures & C Systems",
      progress: 72,
      quizAverage: 78,
      weakTopics: ["Pointers (48%)", "Functions (61%)"],
      status: "Active",
      riskLevel: "Attention Needed",
      lastActive: "Today, 10:14 AM"
    },
    {
      id: "stu-102",
      name: "Priya Sharma",
      email: "priya.sharma@smartlearn.edu",
      course: "Data Structures & C Systems",
      progress: 94,
      quizAverage: 92,
      weakTopics: ["None (All > 85%)"],
      status: "Active",
      riskLevel: "Excelling",
      lastActive: "Today, 11:30 AM"
    },
    {
      id: "stu-103",
      name: "Marcus Vance",
      email: "m.vance@smartlearn.edu",
      course: "Database Management Systems",
      progress: 42,
      quizAverage: 54,
      weakTopics: ["Normalization (42%)", "Transactions (46%)"],
      status: "At Risk",
      riskLevel: "High Support Needed",
      lastActive: "3 days ago"
    },
    {
      id: "stu-104",
      name: "Sophia Chen",
      email: "sophia.chen@smartlearn.edu",
      course: "Java Enterprise Architecture",
      progress: 86,
      quizAverage: 88,
      weakTopics: ["Multithreading (68%)"],
      status: "Active",
      riskLevel: "On Track",
      lastActive: "Yesterday, 4:20 PM"
    },
    {
      id: "stu-105",
      name: "Devon Miller",
      email: "d.miller@smartlearn.edu",
      course: "C++ & STL Systems",
      progress: 60,
      quizAverage: 65,
      weakTopics: ["Operator Overloading (52%)", "Templates (55%)"],
      status: "Active",
      riskLevel: "Moderate Attention",
      lastActive: "2 days ago"
    }
  ];

  // 10. Notifications Center
  const notifications = [
    {
      id: "notif-1",
      category: "recommendation",
      icon: "psychology",
      title: "New Personalized Study Path Available",
      message: "We've created a 15-minute Pointers remediation drill based on your last quiz results.",
      time: "10 mins ago",
      read: false
    },
    {
      id: "notif-2",
      category: "quiz",
      icon: "quiz",
      title: "Quiz Result Analyzed",
      message: "You scored 4/5 (80%) on Core Data Structures. Arrays & Loops verified at mastery.",
      time: "2 hours ago",
      read: false
    },
    {
      id: "notif-3",
      category: "course",
      icon: "school",
      title: "New Lecture Notes Added",
      message: "Prof. Sarah Jenkins uploaded 'C Pointers & Dynamic Memory Architecture (PDF)'.",
      time: "1 day ago",
      read: true
    },
    {
      id: "notif-4",
      category: "announcement",
      icon: "campaign",
      title: "Smart India Hackathon 2026 Evaluation",
      message: "Team HACKSMITH prototype demonstration scheduled for live jury review.",
      time: "2 days ago",
      read: true
    }
  ];

  return {
    currentUser,
    currentTeacher,
    subjects,
    courses,
    studyMaterials,
    videos,
    quizzes,
    weakTopics,
    recommendations,
    practiceQuestionBank,
    teacherStudents,
    notifications
  };
})();

// Export for browser & node
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SmartLearnData;
}
