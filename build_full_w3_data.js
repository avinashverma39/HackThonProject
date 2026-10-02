const fs = require('fs');
const path = require('path');

// Extract existing HTML, CSS, JAVASCRIPT from skills_w3_data.js
const originalCode = fs.readFileSync(path.join(__dirname, 'skills_w3_data.js'), 'utf8');

// We will construct the complete dataset
const extraDocs = {
  sql: [
    {
      id: 'sql-intro',
      category: 'SQL FUNDAMENTALS',
      title: 'SQL Syntax, SELECT & Filtering',
      readTime: '4 min read',
      xp: 40,
      summary: 'Basic SELECT queries, column aliases, WHERE clause operators, and ORDER BY sorting.',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>SQL (Structured Query Language) is the standard language for storing, manipulating and retrieving data in relational databases.</p>
          <h4 class="text-[16px] font-bold text-white border-b border-white/10 pb-1">Essential Clauses &amp; Execution Order</h4>
          <ol class="list-decimal list-inside space-y-1.5 ml-2 text-[13px]">
            <li><code>FROM &amp; JOIN</code>: Identifies tables and combines rows.</li>
            <li><code>WHERE</code>: Filters rows prior to aggregation.</li>
            <li><code>GROUP BY</code>: Groups rows sharing properties.</li>
            <li><code>HAVING</code>: Filters grouped rows.</li>
            <li><code>SELECT</code>: Emits expressions and columns.</li>
            <li><code>ORDER BY</code>: Sorts output ascending (ASC) or descending (DESC).</li>
            <li><code>LIMIT / OFFSET</code>: Paginates results.</li>
          </ol>
        </div>
      `,
      codeExample: `-- Selecting active students ordered by GPA
SELECT 
    student_id,
    full_name,
    cgpa,
    enrollment_date
FROM students
WHERE is_active = TRUE AND cgpa >= 8.5
ORDER BY cgpa DESC
LIMIT 5;`,
      interviewTip: 'Remember the logical query processing order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT. This is why you cannot use column aliases created in SELECT inside WHERE clauses.',
      miniQuiz: {
        q: 'Which clause in SQL filters rows before any aggregation takes place?',
        options: ['HAVING', 'WHERE', 'ORDER BY', 'GROUP BY'],
        answer: 1,
        explanation: 'WHERE filters individual base table records before GROUP BY, while HAVING filters aggregated summaries.'
      }
    },
    {
      id: 'sql-joins-indexing',
      category: 'SQL & RELATIONAL ENGINES',
      title: 'SQL Joins, Indexing & Query Execution Plans',
      readTime: '6 min read',
      xp: 65,
      summary: 'Inner vs Outer Joins, B-Tree vs Hash Indexing, and EXPLAIN ANALYZE performance tuning.',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>Relational databases rely on relational algebra to combine datasets across normalized tables.</p>
          <h4 class="text-[16px] font-bold text-white border-b border-white/10 pb-1">B-Tree Indexes</h4>
          <p>Indexes transform sequential table scans (O(n)) into balanced tree traversals (O(log n)). Always index columns frequently used in <code>WHERE</code> clauses and foreign key joins.</p>
        </div>
      `,
      codeExample: `-- High-performance multi-table join with aggregation
SELECT 
    s.id AS student_id,
    s.full_name,
    COUNT(e.course_id) AS total_enrolled,
    ROUND(AVG(q.score_percentage), 1) AS avg_quiz_score
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id
LEFT JOIN quiz_attempts q ON s.id = q.student_id
WHERE s.is_active = TRUE
GROUP BY s.id, s.full_name
HAVING COUNT(e.course_id) >= 1
ORDER BY avg_quiz_score DESC
LIMIT 10;`,
      interviewTip: 'When asked why too many indexes can degrade database performance: While indexes speed up SELECT reads (O(log n)), every INSERT, UPDATE, and DELETE requires updating all corresponding B-Trees, increasing write latency.',
      miniQuiz: {
        q: 'Which SQL clause is used to filter aggregated group records (created by GROUP BY)?',
        options: ['WHERE', 'HAVING', 'FILTER', 'LIMIT'],
        answer: 1,
        explanation: 'HAVING filters aggregated groups after the GROUP BY operation, while WHERE filters individual rows before grouping occurs.'
      }
    },
    {
      id: 'sql-aggregates',
      category: 'SQL AGGREGATIONS & WINDOW FUNCTIONS',
      title: 'Aggregate Functions & Window Functions (OVER, PARTITION BY)',
      readTime: '6 min read',
      xp: 60,
      summary: 'COUNT, SUM, AVG, and advanced window analytical functions (ROW_NUMBER, RANK, DENSE_RANK).',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>Window functions perform a calculation across a set of table rows that are somehow related to the current row, without collapsing rows into a single summary row.</p>
        </div>
      `,
      codeExample: `-- Rank students within each academic department
SELECT 
    department,
    full_name,
    cgpa,
    DENSE_RANK() OVER(PARTITION BY department ORDER BY cgpa DESC) as dept_rank
FROM students;`,
      interviewTip: 'Difference between RANK() and DENSE_RANK(): RANK() leaves gaps in sequence upon ties (1, 2, 2, 4), while DENSE_RANK() does not leave gaps (1, 2, 2, 3).',
      miniQuiz: {
        q: 'Which analytical clause partitions window calculations into separate groups without collapsing rows?',
        options: ['GROUP BY', 'PARTITION BY', 'DIVIDE BY', 'SPLIT BY'],
        answer: 1,
        explanation: 'PARTITION BY inside the OVER() clause divides the result set into partitions to which the window function is applied.'
      }
    }
  ],

  python: [
    {
      id: 'py-memory-model',
      category: 'PYTHON INTERNALS',
      title: 'Python Memory Model & Mutable vs Immutable',
      readTime: '6 min read',
      xp: 55,
      summary: 'Variables as references, id(), pass-by-object-reference, and memory management.',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>In Python, <strong class="text-white">everything is an object</strong>. Variables do not store values directly; they are named bindings/references to objects in heap memory.</p>
          <ul class="list-disc list-inside space-y-1 ml-2">
            <li><strong class="text-emerald-400">Immutable:</strong> <code>int</code>, <code>float</code>, <code>str</code>, <code>tuple</code>, <code>frozenset</code>. Modifying creates a brand new object.</li>
            <li><strong class="text-rose-400">Mutable:</strong> <code>list</code>, <code>dict</code>, <code>set</code>, custom classes. Modified in-place.</li>
          </ul>
        </div>
      `,
      codeExample: `# Demonstrating default mutable argument trap
def append_item(item, target_list=[]): # AVOID mutable defaults!
    target_list.append(item)
    return target_list

print(append_item(1)) # [1]
print(append_item(2)) # [1, 2] -- The list was shared across invocations!

# Correct Pythonic Pattern:
def append_item_clean(item, target_list=None):
    if target_list is None:
        target_list = []
    target_list.append(item)
    return target_list`,
      interviewTip: 'Never use mutable objects (like lists or dictionaries) as default arguments in Python function signatures, because the default value is evaluated once when the function is defined, not each time it is called.',
      miniQuiz: {
        q: 'Which of the following data types in Python is immutable?',
        options: ['list', 'dict', 'set', 'tuple'],
        answer: 3,
        explanation: 'Tuples are immutable sequences in Python; their elements cannot be added, removed, or re-assigned once constructed.'
      }
    },
    {
      id: 'py-list-comprehensions',
      category: 'PYTHONIC IDIOMS',
      title: 'List Comprehensions & Generator Expressions',
      readTime: '5 min read',
      xp: 50,
      summary: 'Concise syntax for constructing lists, dict comprehensions, memory-efficient generators (yield).',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>List comprehensions provide a concise way to create lists from existing iterables while avoiding explicit loop boilerplate and memory bloat.</p>
        </div>
      `,
      codeExample: `# Filter and square even numbers
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_squares = [x**2 for x in numbers if x % 2 == 0]
print(even_squares) # [4, 16, 36, 64, 100]

# Memory-efficient generator expression
gen = (x**2 for x in range(1_000_000))
print(next(gen)) # 0
print(next(gen)) # 1`,
      interviewTip: 'Generators yield one item at a time lazily on demand using the iterator protocol, consuming O(1) memory regardless of how many millions of items are yielded.',
      miniQuiz: {
        q: 'What keyword turns a standard Python function into a generator that produces items lazily?',
        options: ['return', 'yield', 'produce', 'emit'],
        answer: 1,
        explanation: 'The yield keyword pauses function execution, returning a value to the caller, and resumes on subsequent next() calls.'
      }
    },
    {
      id: 'py-oop-dunder',
      category: 'OBJECT ORIENTED PYTHON',
      title: 'Python OOP, Dunder Methods & Dataclasses',
      readTime: '6 min read',
      xp: 60,
      summary: '__init__, __repr__, __eq__, magic operators, and @dataclass decorator.',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>Dunder (double underscore) methods allow user-defined classes to hook into Python syntax such as print representation, equality, and arithmetic operators.</p>
        </div>
      `,
      codeExample: `from dataclasses import dataclass

@dataclass
class Student:
    name: str
    roll: str
    cgpa: float

    def is_honor_roll(self) -> bool:
        return self.cgpa >= 8.5

s1 = Student("Avinash Verma", "24CSE089", 8.84)
print(s1) # Student(name='Avinash Verma', roll='24CSE089', cgpa=8.84)
print(s1.is_honor_roll()) # True`,
      interviewTip: 'Explain __str__ vs __repr__: __str__ is designed for end-user readability, while __repr__ is unambiguous and designed for developers and debugging.',
      miniQuiz: {
        q: 'Which standard decorator introduced in Python 3.7 auto-generates __init__, __repr__, and __eq__ boilerplate?',
        options: ['@property', '@dataclass', '@classmethod', '@staticmethod'],
        answer: 1,
        explanation: '@dataclass automatically generates special methods such as __init__() and __repr__() based on class attribute type annotations.'
      }
    }
  ],

  java: [
    {
      id: 'java-intro-jvm',
      category: 'JAVA FUNDAMENTALS & JVM',
      title: 'JVM Architecture: JDK vs JRE vs JVM & Garbage Collection',
      readTime: '6 min read',
      xp: 60,
      summary: 'Classloader subsystem, JVM Memory (Heap, Stack, Metaspace), and Generational Garbage Collection.',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>Java achieves "Write Once, Run Anywhere" (WORA) via the Java Virtual Machine (JVM). Java source code (.java) compiles into bytecode (.class), which the JVM executes.</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[12px]">
            <div class="p-3 rounded-xl bg-surface-container border border-white/5"><strong class="text-white">JDK:</strong> Developer tools (javac, jar, debugger) + JRE</div>
            <div class="p-3 rounded-xl bg-surface-container border border-white/5"><strong class="text-white">JRE:</strong> JVM runtime engine + standard class libraries</div>
            <div class="p-3 rounded-xl bg-surface-container border border-white/5"><strong class="text-white">JVM:</strong> Bytecode interpreter + JIT Compiler + GC</div>
          </div>
        </div>
      `,
      codeExample: `public class SmartLearnHello {
    public static void main(String[] args) {
        System.out.println("Welcome to Java Programming on SmartLearn!");
        
        int a = 15;
        int b = 25;
        System.out.println("Sum = " + (a + b));
    }
}`,
      interviewTip: 'Explain why Java is not 100% pure Object-Oriented: Because Java supports primitive data types (int, float, char, boolean, etc.) that do not inherit from java.lang.Object.',
      miniQuiz: {
        q: 'Which component of Java is responsible for compiling .java source code into bytecode .class files?',
        options: ['JVM', 'JIT Compiler', 'javac', 'ClassLoader'],
        answer: 2,
        explanation: 'javac is the primary Java compiler included in the JDK that translates human-readable source code into portable JVM bytecode.'
      }
    },
    {
      id: 'java-collections',
      category: 'JAVA DATA STRUCTURES',
      title: 'Java Collections Framework: List, Set, Map & Complexity',
      readTime: '7 min read',
      xp: 65,
      summary: 'ArrayList vs LinkedList, HashSet vs TreeSet, HashMap hashing collision resolution and load factor.',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>The Java Collections Framework provides an architecture to store and manipulate groups of objects.</p>
        </div>
      `,
      codeExample: `import java.util.*;

public class CollectionDemo {
    public static void main(String[] args) {
        Map<String, Double> grades = new HashMap<>();
        grades.put("DSA", 9.2);
        grades.put("DBMS", 8.8);
        grades.put("Networks", 8.5);

        for (Map.Entry<String, Double> entry : grades.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}`,
      interviewTip: 'How does HashMap handle bucket collisions in Java 8+? If the number of items in a bucket exceeds 8 (TREEIFY_THRESHOLD) and table capacity >= 64, the linked list converts into a balanced Red-Black Tree, improving lookup from O(n) to O(log n).',
      miniQuiz: {
        q: 'What is the default initial capacity and load factor of a standard Java HashMap?',
        options: ['16 and 0.75', '32 and 0.50', '10 and 1.00', '8 and 0.75'],
        answer: 0,
        explanation: 'Java HashMap defaults to an initial bucket array size of 16 and a load factor of 0.75 before resizing (rehashing).'
      }
    },
    {
      id: 'java-streams',
      category: 'MODERN JAVA (8+)',
      title: 'Streams API, Functional Interfaces & Lambdas',
      readTime: '6 min read',
      xp: 60,
      summary: 'Stream pipeline (source, intermediate filter/map, terminal collect), method references, and Optional.',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>Streams facilitate declarative data processing pipelines over collection structures with lazy evaluation.</p>
        </div>
      `,
      codeExample: `import java.util.*;
import java.util.stream.Collectors;

public class StreamsDemo {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Avinash", "Sarah", "Alex", "David", "Aman");
        
        List<String> aNames = names.stream()
            .filter(name -> name.startsWith("A"))
            .map(String::toUpperCase)
            .sorted()
            .collect(Collectors.toList());

        System.out.println(aNames); // [AMAN, ALEX, AVINASH]
    }
}`,
      interviewTip: 'Explain why Streams are lazy: Intermediate operations (filter, map) do not execute until a terminal operation (collect, count, forEach) is triggered on the stream.',
      miniQuiz: {
        q: 'Which of the following is a terminal operation in the Java Streams API?',
        options: ['filter()', 'map()', 'sorted()', 'collect()'],
        answer: 3,
        explanation: 'collect() is a terminal operation that initiates stream processing and packs items into a container like List or Set.'
      }
    }
  ],

  php: [
    {
      id: 'php-intro-syntax',
      category: 'PHP FUNDAMENTALS',
      title: 'PHP Syntax, Superglobals & Server Architecture',
      readTime: '5 min read',
      xp: 45,
      summary: 'PHP tags, variable syntax ($var), type juggling, and core superglobals ($_GET, $_POST, $_SERVER).',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>PHP (Hypertext Preprocessor) is an open-source, server-side scripting language designed specifically for dynamic web development.</p>
        </div>
      `,
      codeExample: `<?php
// PHP 8+ typed function
function calculateScore(float $base, float $bonus): float {
    return $base + $bonus;
}

$student = "Avinash";
$finalScore = calculateScore(85.5, 7.5);

echo "Student {$student} scored: {$finalScore} / 100";
?>`,
      interviewTip: 'Explain the difference between include, require, include_once, and require_once: require throws a fatal E_COMPILE_ERROR and halts execution if the file is missing, while include only emits an E_WARNING.',
      miniQuiz: {
        q: 'Which PHP superglobal array contains HTTP POST form submission data?',
        options: ['$_GET', '$_POST', '$_REQUEST', '$_SERVER'],
        answer: 1,
        explanation: '$_POST is an associative array of variables passed to the current script via the HTTP POST method.'
      }
    },
    {
      id: 'php-pdo-security',
      category: 'PHP DATABASE & SECURITY',
      title: 'PHP Data Objects (PDO) & SQL Injection Prevention',
      readTime: '6 min read',
      xp: 60,
      summary: 'PDO connection setup, prepared statements, parameter binding, and CSRF/XSS protection.',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>Never concatenate user input directly into SQL strings. Always use PDO prepared statements with bound parameters.</p>
        </div>
      `,
      codeExample: `<?php
try {
    $pdo = new PDO("mysql:host=localhost;dbname=smartlearn;charset=utf8mb4", "db_user", "db_pass", [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    $stmt = $pdo->prepare("SELECT id, full_name, cgpa FROM students WHERE is_active = :status");
    $stmt->execute(['status' => 1]);
    $students = $stmt->fetchAll();

    echo json_encode($students);
} catch (PDOException $e) {
    echo "Database error: " . $e->getMessage();
}
?>`,
      interviewTip: 'Why are prepared statements immune to SQL injection? Because the database compiles the SQL query structure first, and then treats the bound parameters strictly as literal values, never as executable SQL commands.',
      miniQuiz: {
        q: 'Which database abstraction layer in PHP supports multiple relational databases with prepared statements?',
        options: ['mysqli', 'PDO (PHP Data Objects)', 'mysql_connect', 'pg_query'],
        answer: 1,
        explanation: 'PDO provides a consistent interface across 12 different database drivers with built-in prepared statements.'
      }
    }
  ],

  c: [
    {
      id: 'c-pointers-memory',
      category: 'C MEMORY & POINTERS',
      title: 'C Pointers, Memory Addresses & Dereferencing',
      readTime: '6 min read',
      xp: 65,
      summary: 'Address-of operator (&), dereference operator (*), pointer arithmetic, and void pointers.',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>A pointer in C is a variable that stores the memory address of another variable. Direct memory manipulation gives C unmatched raw execution speed.</p>
        </div>
      `,
      codeExample: `#include <stdio.h>

void swap(int *x, int *y) {
    int temp = *x;
    *x = *y;
    *y = temp;
}

int main() {
    int a = 10, b = 20;
    printf("Before swap: a = %d, b = %d\\n", a, b);
    swap(&a, &b);
    printf("After swap:  a = %d, b = %d\\n", a, b);
    return 0;
}`,
      interviewTip: 'What is a Dangling Pointer? A pointer that points to memory that has already been deallocated (freed) or a local variable that has gone out of scope.',
      miniQuiz: {
        q: 'Which operator is used to retrieve the memory address of a variable in C?',
        options: ['*', '&', '->', '%'],
        answer: 1,
        explanation: 'The ampersand (&) is the address-of operator; it evaluates to the physical memory location of its operand.'
      }
    },
    {
      id: 'c-dynamic-allocation',
      category: 'C MEMORY ALLOCATION',
      title: 'Dynamic Memory Allocation: malloc, calloc, realloc & free',
      readTime: '6 min read',
      xp: 60,
      summary: 'Heap memory allocation, memory leaks, NULL pointer checking, and sizeof() operator.',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>Static memory lives on the Stack with fixed lifetimes; dynamic memory lives on the Heap and must be explicitly allocated and freed by the programmer.</p>
        </div>
      `,
      codeExample: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;
    int *arr = (int *)malloc(n * sizeof(int));
    if (arr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    for (int i = 0; i < n; i++) arr[i] = (i + 1) * 10;
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");

    free(arr); // Always free heap allocations!
    arr = NULL; // Prevent dangling pointer
    return 0;
}`,
      interviewTip: 'What is the key difference between malloc() and calloc()? malloc() allocates uninitialized memory containing garbage values; calloc() allocates memory and clears every single byte to zero.',
      miniQuiz: {
        q: 'What happens if you allocate heap memory in C with malloc() but never call free() before terminating?',
        options: ['Segmentation fault immediately', 'Memory Leak', 'Compiler warning at build time', 'Memory is transferred to stack'],
        answer: 1,
        explanation: 'Failing to free allocated heap memory results in a Memory Leak where RAM remains allocated and unavailable.'
      }
    }
  ],

  cpp: [
    {
      id: 'cpp-oop-classes',
      category: 'C++ OBJECT ORIENTED',
      title: 'C++ Classes, Constructors, Destructors & RAII',
      readTime: '6 min read',
      xp: 65,
      summary: 'Encapsulation, initialization lists, copy/move constructors, and Resource Acquisition Is Initialization (RAII).',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>C++ bridges low-level systems programming with zero-overhead object-oriented abstractions. RAII guarantees resources are safely released when objects exit scope.</p>
        </div>
      `,
      codeExample: `#include <iostream>
#include <string>

class Student {
private:
    std::string name;
    double gpa;

public:
    // Member initialization list
    Student(std::string n, double g) : name(n), gpa(g) {}

    void display() const {
        std::cout << "Student: " << name << " | GPA: " << gpa << std::endl;
    }
};

int main() {
    Student s("Avinash Verma", 8.84);
    s.display();
    return 0;
}`,
      interviewTip: 'Explain virtual destructors in C++: If a class has any virtual functions, its destructor must be declared virtual to ensure proper polymorphic deletion through a base-class pointer.',
      miniQuiz: {
        q: 'What C++ paradigm links resource lifetime directly to object scope lifetime?',
        options: ['OOP', 'RAII (Resource Acquisition Is Initialization)', 'STL', 'RTTI'],
        answer: 1,
        explanation: 'RAII binds resource allocation to object construction and resource deallocation to object destruction (destructor).'
      }
    },
    {
      id: 'cpp-stl-containers',
      category: 'C++ STANDARD TEMPLATE LIBRARY (STL)',
      title: 'STL Containers: std::vector, std::map, std::unordered_map',
      readTime: '6 min read',
      xp: 60,
      summary: 'Dynamic contiguous arrays (vector), Red-Black Tree maps (O(log n)), and Hash tables (O(1) average).',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>The Standard Template Library (STL) provides battle-tested algorithms, containers, and iterators engineered for optimal performance.</p>
        </div>
      `,
      codeExample: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> scores = {92, 75, 88, 64, 99};
    scores.push_back(84);

    std::sort(scores.begin(), scores.end());

    std::cout << "Sorted scores: ";
    for (int score : scores) {
        std::cout << score << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
      interviewTip: 'When to choose std::map vs std::unordered_map? Choose std::map when you need keys sorted in order (O(log n) Red-Black Tree). Choose std::unordered_map for fastest O(1) hash lookups when ordering does not matter.',
      miniQuiz: {
        q: 'What is the average time complexity of element insertion in std::unordered_map?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        answer: 0,
        explanation: 'std::unordered_map is implemented using a hash table, providing O(1) constant time on average.'
      }
    }
  ],

  csharp: [
    {
      id: 'cs-intro-dotnet',
      category: 'C# & .NET FUNDAMENTALS',
      title: 'C# Syntax, Common Language Runtime (CLR) & Auto-Properties',
      readTime: '5 min read',
      xp: 50,
      summary: 'C# type system, managed memory, garbage collection, and modern property syntax.',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>C# is a modern, type-safe, object-oriented language developed by Microsoft running on the open-source cross-platform .NET runtime.</p>
        </div>
      `,
      codeExample: `using System;

public class Student {
    public string Name { get; set; }
    public double CGPA { get; set; }

    public Student(string name, double cgpa) {
        Name = name;
        CGPA = cgpa;
    }
}

class Program {
    static void Main() {
        var s = new Student("Avinash Verma", 8.84);
        Console.WriteLine($"Student: {s.Name} with GPA {s.CGPA}");
    }
}`,
      interviewTip: 'Explain Value Types vs Reference Types in C#: Value types (struct, int, bool) are stored directly on the stack or in-place, while Reference types (class, string, delegate) allocate memory on the managed heap.',
      miniQuiz: {
        q: 'What execution engine manages the execution of C# .NET programs, handling JIT compilation and memory management?',
        options: ['JVM', 'CLR (Common Language Runtime)', 'JDK', 'V8 Engine'],
        answer: 1,
        explanation: 'The CLR is the runtime engine for .NET that converts Intermediate Language (IL) code into machine instructions.'
      }
    },
    {
      id: 'cs-linq-queries',
      category: 'C# MODERN CAPABILITIES',
      title: 'LINQ (Language Integrated Query) & Lambda Expressions',
      readTime: '6 min read',
      xp: 60,
      summary: 'Query syntax vs Method syntax, Where, Select, OrderBy, GroupBy, and deferred execution.',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>LINQ introduces first-class declarative querying capabilities directly into C# syntax over collections, databases (EF Core), and XML.</p>
        </div>
      `,
      codeExample: `using System;
using System.Collections.Generic;
using System.Linq;

class LinqDemo {
    static void Main() {
        List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

        var evenSquares = numbers
            .Where(n => n % 2 == 0)
            .Select(n => n * n)
            .OrderByDescending(n => n);

        Console.WriteLine(string.Join(", ", evenSquares)); // 100, 64, 36, 16, 4
    }
}`,
      interviewTip: 'What is Deferred Execution in LINQ? A LINQ query is not actually executed when it is defined; it executes only when iterated over with foreach or converted via ToList() / ToArray().',
      miniQuiz: {
        q: 'Which LINQ method projects each element of a sequence into a new form (similar to map)?',
        options: ['Where()', 'Select()', 'Filter()', 'Aggregate()'],
        answer: 1,
        explanation: 'Select() transforms/projects elements of a collection into a new sequence of values.'
      }
    }
  ],

  aws: [
    {
      id: 'aws-cloud-foundations',
      category: 'AWS CLOUD ARCHITECTURE',
      title: 'Cloud Foundations: Regions, Availability Zones & Core Services',
      readTime: '5 min read',
      xp: 50,
      summary: 'AWS global infrastructure, Shared Responsibility Model, EC2, S3, and VPC fundamentals.',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>Amazon Web Services (AWS) is the world\'s leading cloud computing platform offering over 200 fully featured services globally.</p>
        </div>
      `,
      codeExample: `// AWS CLI command to list Amazon S3 buckets securely
aws s3 ls

// Syncing production web assets to an S3 static bucket
aws s3 sync ./dist s3://smartlearn-cdn-assets --acl public-read`,
      interviewTip: 'Memorize the AWS Shared Responsibility Model: AWS is responsible for Security "OF" the Cloud (hardware, data centers, host OS). The Customer is responsible for Security "IN" the Cloud (data encryption, IAM credentials, firewall rules).',
      miniQuiz: {
        q: 'Which AWS service provides resizable, secure compute capacity (virtual servers) in the cloud?',
        options: ['Amazon S3', 'Amazon EC2', 'AWS Lambda', 'Amazon DynamoDB'],
        answer: 1,
        explanation: 'Amazon Elastic Compute Cloud (EC2) provides virtual compute instances on demand.'
      }
    },
    {
      id: 'aws-serverless-lambda',
      category: 'AWS SERVERLESS',
      title: 'AWS Lambda, API Gateway & Event-Driven Architecture',
      readTime: '6 min read',
      xp: 60,
      summary: 'Serverless compute, cold starts, concurrency limits, and DynamoDB triggers.',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>Serverless computing runs code without provisioning or managing servers. You pay strictly for compute time consumed down to the millisecond.</p>
        </div>
      `,
      codeExample: `// AWS Lambda handler in Node.js
exports.handler = async (event) => {
    const studentName = event.queryStringParameters?.name || "Learner";
    
    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message: \`Hello \${studentName}, your SmartLearn Lambda function fired successfully!\`,
            timestamp: new Date().toISOString()
        })
    };
};`,
      interviewTip: 'What causes AWS Lambda "cold starts"? When a Lambda function has not been invoked recently, AWS must initialize a new container, download code, and start the runtime, adding latency to the first request.',
      miniQuiz: {
        q: 'What is the maximum execution timeout duration for a single AWS Lambda function invocation?',
        options: ['5 minutes', '15 minutes', '1 hour', 'Unlimited'],
        answer: 1,
        explanation: 'AWS Lambda functions have a maximum hard execution timeout limit of 15 minutes (900 seconds).'
      }
    }
  ],

  w3css: [
    {
      id: 'w3css-intro-grids',
      category: 'W3.CSS FRAMEWORK',
      title: 'W3.CSS Grid System, Containers & Responsive Classes',
      readTime: '5 min read',
      xp: 45,
      summary: 'w3-container, w3-row, w3-col, w3-card, responsive prefixes (s, m, l), and zero-dependency CSS.',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>W3.CSS is a modern, responsive, mobile-first CSS framework created by W3Schools with zero JavaScript dependencies.</p>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
</head>
<body>
  <div class="w3-container w3-indigo">
    <h2>SmartLearn W3.CSS Demo</h2>
  </div>
  <div class="w3-row-padding w3-margin-top">
    <div class="w3-col s12 m6 l4">
      <div class="w3-card w3-padding w3-white">
        <h4>Modular Learning</h4>
        <p>Speedy responsive layouts with pure CSS classes.</p>
      </div>
    </div>
  </div>
</body>
</html>`,
      interviewTip: 'Why choose W3.CSS over larger frameworks like Bootstrap? W3.CSS is ultra-lightweight (one small CSS file, approx 23KB), faster to load, and requires zero JavaScript or jQuery dependencies.',
      miniQuiz: {
        q: 'In W3.CSS, how many columns does the default grid row (w3-row) divide into?',
        options: ['10 columns', '12 columns', '16 columns', '8 columns'],
        answer: 1,
        explanation: 'The W3.CSS grid system is based on a standard 12-column layout (w3-col s1 through s12).'
      }
    }
  ],

  howto: [
    {
      id: 'howto-responsive-navbar',
      category: 'HOW TO SNIPPETS',
      title: 'How To: Build a Modern Responsive Navbar with Mobile Drawer',
      readTime: '5 min read',
      xp: 50,
      summary: 'Step-by-step tutorial: HTML landmark structure, flexbox alignment, hamburger button toggle, and clean transitions.',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>Create a production-ready responsive navigation bar that switches gracefully between a horizontal desktop dock and a mobile accordion.</p>
        </div>
      `,
      codeExample: `<nav class="navbar" style="display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:12px 20px; border-radius:10px;">
  <span style="color:#38bdf8; font-weight:bold; font-size:18px;">SmartLearn</span>
  <div style="display:flex; gap:16px;">
    <a href="#" style="color:#e2e8f0; text-decoration:none;">Dashboard</a>
    <a href="#" style="color:#e2e8f0; text-decoration:none;">Courses</a>
    <a href="#" style="color:#e2e8f0; text-decoration:none;">Skills</a>
  </div>
</nav>`,
      interviewTip: 'Always attach keyboard event listeners (like ESC key) to close navigation drawers and modal overlays for full accessibility (a11y) compliance.',
      miniQuiz: {
        q: 'Which HTML5 semantic element should wrap top-level navigation links?',
        options: ['<header>', '<nav>', '<section>', '<aside>'],
        answer: 1,
        explanation: 'The <nav> semantic landmark communicates to screen readers and bots that enclosed links represent site navigation.'
      }
    },
    {
      id: 'howto-accordion-collapse',
      category: 'HOW TO SNIPPETS',
      title: 'How To: Create Collapsible Accordions & FAQ Drawers',
      readTime: '4 min read',
      xp: 45,
      summary: 'Using native HTML5 <details> and <summary> or lightweight JavaScript toggle handlers.',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>Modern HTML provides the native <code>&lt;details&gt;</code> and <code>&lt;summary&gt;</code> tags to build completely functional accordions without writing a single line of JavaScript!</p>
        </div>
      `,
      codeExample: `<details style="background:#0f172a; padding:12px; border-radius:8px; border:1px solid #334155; margin-bottom:8px;">
  <summary style="color:#38bdf8; font-weight:bold; cursor:pointer;">What is SmartLearn SIH 2026?</summary>
  <p style="color:#94a3b8; margin-top:8px; font-size:13px;">SmartLearn is an adaptive AI-driven smart education platform designed to detect conceptual weak spots and guide engineering students toward mastery.</p>
</details>`,
      interviewTip: 'Native <code>&lt;details&gt;</code> elements are keyboard accessible out of the box (Space and Enter toggle expansion), saving dozens of lines of custom JS.',
      miniQuiz: {
        q: 'Which child element specifies the visible clickable heading of a native HTML <details> tag?',
        options: ['<title>', '<header>', '<summary>', '<label>'],
        answer: 2,
        explanation: '<summary> defines the visible heading for the disclosure box of a <details> element.'
      }
    }
  ],

  bootstrap: [
    {
      id: 'bs-grid-breakpoints',
      category: 'BOOTSTRAP 5 ARCHITECTURE',
      title: 'Bootstrap 5 Grid System, Breakpoints & Flex Utilities',
      readTime: '5 min read',
      xp: 45,
      summary: '12-column grid, container vs container-fluid, responsive infix (sm, md, lg, xl, xxl), and row-cols.',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>Bootstrap 5 provides a powerful mobile-first flexbox grid system to build layouts of all shapes and sizes.</p>
        </div>
      `,
      codeExample: `<div class="container-fluid py-4">
  <div class="row g-3">
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card p-3 shadow-sm bg-dark text-white">
        <h5 class="card-title text-info">Card Column 1</h5>
        <p class="card-text text-muted">Adapts across all responsive viewport widths.</p>
      </div>
    </div>
  </div>
</div>`,
      interviewTip: 'What major change happened to JavaScript dependencies in Bootstrap 5? jQuery was completely dropped in favor of pure, modern vanilla JavaScript.',
      miniQuiz: {
        q: 'Which Bootstrap breakpoint infix corresponds to viewport widths >= 768px (tablets)?',
        options: ['sm', 'md', 'lg', 'xl'],
        answer: 1,
        explanation: 'md targets viewports at or above 768px in the Bootstrap 5 responsive hierarchy.'
      }
    }
  ],

  react: [
    {
      id: 'react-components-state',
      category: 'REACT FUNDAMENTALS',
      title: 'React Components, JSX & useState Hook',
      readTime: '6 min read',
      xp: 65,
      summary: 'Functional components, unidirectional data flow, immutable state updates, and re-rendering lifecycles.',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>React is a declarative, efficient, and flexible JavaScript library for building component-driven user interfaces.</p>
        </div>
      `,
      codeExample: `import React, { useState } from 'react';

export function StudyStreakTracker() {
  const [streak, setStreak] = useState(12);

  return (
    <div style={{ padding: '16px', background: '#1e1b4b', borderRadius: '12px' }}>
      <h3 style={{ color: '#818cf8' }}>Active Streak: {streak} Days 🔥</h3>
      <button 
        style={{ padding: '8px 16px', background: '#6366f1', color: '#fff', borderRadius: '8px', border: 'none' }}
        onClick={() => setStreak(prev => prev + 1)}>
        Log Today's Study Hour
      </button>
    </div>
  );
}`,
      interviewTip: 'Why should you never mutate React state directly (e.g. <code>state.count = 5</code>)? React relies on object reference equality comparisons (Object.is) to determine when components need to re-render; mutating in-place prevents re-rendering.',
      miniQuiz: {
        q: 'Which React hook is used to declare state variables in functional components?',
        options: ['useEffect', 'useState', 'useContext', 'useReducer'],
        answer: 1,
        explanation: 'useState() declares state variables and provides an updater function that triggers re-rendering when state changes.'
      }
    },
    {
      id: 'react-useeffect-lifecycle',
      category: 'REACT HOOKS & LIFECYCLES',
      title: 'useEffect Hook: Side-Effects, Dependencies & Cleanup',
      readTime: '6 min read',
      xp: 60,
      summary: 'Data fetching, subscription lifecycles, dependency array traps, and cleanup functions.',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>The <code>useEffect</code> hook allows performing side effects (like data fetching, timers, or direct DOM manipulation) in functional components.</p>
        </div>
      `,
      codeExample: `import React, { useState, useEffect } from 'react';

export function RealTimeTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Cleanup function: runs on unmount or before effect re-runs
    return () => clearInterval(timer);
  }, []); // Empty deps: runs once on mount

  return <div>Elapsed Time: {seconds}s</div>;
}`,
      interviewTip: 'What happens if you omit the dependency array in useEffect? The effect callback runs after EVERY single render of the component, which frequently causes infinite re-render loops when updating state inside the effect.',
      miniQuiz: {
        q: 'What does returning a function from a useEffect callback do?',
        options: ['Throws an error', 'Defines a cleanup function executed on unmount', 'Causes an infinite loop', 'Renders a child component'],
        answer: 1,
        explanation: 'The returned function is the effect cleanup mechanism, executed before the component unmounts or before the effect re-runs.'
      }
    }
  ],

  mysql: [
    {
      id: 'mysql-architecture-storage',
      category: 'MYSQL DATABASE ENGINE',
      title: 'MySQL Architecture, InnoDB Engine & ACID Transactions',
      readTime: '6 min read',
      xp: 60,
      summary: 'InnoDB vs MyISAM, Row-level locking, Foreign Key constraints, and Write-Ahead Logging (WAL).',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>MySQL is the world\'s most popular open-source relational database management system. InnoDB is its default ACID-compliant storage engine.</p>
        </div>
      `,
      codeExample: `-- Atomic transaction example in MySQL
START TRANSACTION;

UPDATE accounts SET balance = balance - 500 WHERE id = 101;
UPDATE accounts SET balance = balance + 500 WHERE id = 202;

-- If checks pass, commit changes atomically:
COMMIT;
-- If any query fails:
-- ROLLBACK;`,
      interviewTip: 'Define the ACID properties: Atomicity (all or nothing), Consistency (preserves schema rules), Isolation (concurrent transactions do not interfere), Durability (committed data survives server crashes).',
      miniQuiz: {
        q: 'Which default MySQL storage engine supports transactions and foreign keys?',
        options: ['MyISAM', 'InnoDB', 'Memory', 'CSV'],
        answer: 1,
        explanation: 'InnoDB is the default transaction-safe (ACID compliant) storage engine for MySQL.'
      }
    }
  ],

  jquery: [
    {
      id: 'jquery-selectors-events',
      category: 'JQUERY LIBRARY',
      title: 'jQuery DOM Manipulation, Event Listeners & AJAX',
      readTime: '5 min read',
      xp: 45,
      summary: '$(document).ready(), CSS-style selectors, chaining methods, and $.ajax() wrappers.',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>jQuery simplified HTML DOM tree traversal and manipulation, event handling, and Ajax across legacy browsers.</p>
        </div>
      `,
      codeExample: `// Modern jQuery syntax
$(document).ready(function() {
  $('#submit-btn').on('click', function() {
    $(this).addClass('active').fadeOut(300).fadeIn(300);
    
    $.getJSON('/api/stats', function(data) {
      $('#stats-count').text(data.totalStudents);
    });
  });
});`,
      interviewTip: 'Modern vanilla JavaScript provides <code>document.querySelector()</code>, <code>fetch()</code>, and <code>classList</code>, which match jQuery functionality natively without downloading a 30KB library.',
      miniQuiz: {
        q: 'What is the primary shorthand function identifier used in jQuery?',
        options: ['@', '#', '$', '&'],
        answer: 2,
        explanation: 'The dollar sign ($) is the shorthand alias for the jQuery object.'
      }
    }
  ],

  excel: [
    {
      id: 'excel-formulas-lookup',
      category: 'EXCEL & DATA ANALYTICS',
      title: 'Excel Essential Formulas: VLOOKUP, XLOOKUP & INDEX/MATCH',
      readTime: '5 min read',
      xp: 50,
      summary: 'Absolute ($A$1) vs relative cell references, XLOOKUP modern replacement, and dynamic arrays.',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>Mastering modern spreadsheet formulas is crucial for business intelligence, academic research, and engineering analytics.</p>
        </div>
      `,
      codeExample: `=XLOOKUP(D2, Students!A:A, Students!C:C, "Not Found", 0)

=INDEX(Employees!B:B, MATCH(A2, Employees!A:A, 0))`,
      interviewTip: 'Why is XLOOKUP superior to legacy VLOOKUP? XLOOKUP looks both left and right (VLOOKUP only looks right), defaults to exact matches, and doesn\'t break when new columns are inserted.',
      miniQuiz: {
        q: 'Which modern Excel formula replaces both VLOOKUP and HLOOKUP with bidirectional search?',
        options: ['MATCH', 'XLOOKUP', 'SEARCH', 'FIND'],
        answer: 1,
        explanation: 'XLOOKUP performs lookups in both vertical and horizontal directions with safer defaults.'
      }
    }
  ],

  xml: [
    {
      id: 'xml-syntax-schemas',
      category: 'XML & STRUCTURED DATA',
      title: 'XML Syntax, Tree Structure, Namespaces & XPath',
      readTime: '5 min read',
      xp: 45,
      summary: 'Well-formed vs valid documents, XML declarations, attributes vs child elements, and XPath queries.',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>Extensible Markup Language (XML) is a software- and hardware-independent tool for storing and transporting structured data.</p>
        </div>
      `,
      codeExample: `<?xml version="1.0" encoding="UTF-8"?>
<curriculum institution="SmartLearn University">
  <course id="CS301">
    <title>Data Structures and Algorithms</title>
    <credits>4</credits>
    <mentor>Prof. Sarah Jenkins</mentor>
  </course>
</curriculum>`,
      interviewTip: 'Difference between XML and HTML: HTML is designed to display data with focus on presentation; XML is designed to describe and carry data with focus on structured semantics.',
      miniQuiz: {
        q: 'What is an XML document called when it obeys all fundamental XML syntax rules?',
        options: ['Valid', 'Well-formed', 'Certified', 'Compiled'],
        answer: 1,
        explanation: 'An XML document with correct syntax is called "Well-formed". If it also conforms to a DTD or Schema, it is called "Valid".'
      }
    }
  ],

  django: [
    {
      id: 'django-mvt-architecture',
      category: 'DJANGO WEB FRAMEWORK',
      title: 'Django MVT Architecture, ORM Models & Views',
      readTime: '6 min read',
      xp: 60,
      summary: 'Model-View-Template pattern, Django ORM migrations, URL dispatcher, and Django Admin portal.',
      contentHtml: `
        <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
          <p>Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design with "batteries included".</p>
        </div>
      `,
      codeExample: `# models.py
from django.db import models

class Student(models.Model):
    full_name = models.CharField(max_length=100)
    roll_number = models.CharField(max_length=20, unique=True)
    cgpa = models.DecimalField(max_digits=4, decimal_places=2)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.full_name} ({self.roll_number})"`,
      interviewTip: 'Explain the difference between MVC and Django\'s MVT: In Django, the framework itself handles the Controller duties; the View functions as the logic processor, and the Template handles the presentation.',
      miniQuiz: {
        q: 'In Django\'s MVT architecture, what does the "T" stand for?',
        options: ['Table', 'Template', 'Transaction', 'Target'],
        answer: 1,
        explanation: 'MVT stands for Model, View, Template.'
      }
    }
  ]
};

// Now read existing docs from skills_w3_data.js and merge
console.log('Extra docs keys:', Object.keys(extraDocs));
