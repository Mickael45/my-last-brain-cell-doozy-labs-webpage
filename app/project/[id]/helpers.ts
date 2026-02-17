const programmingLanguages = [
  { name: "JavaScript", description: "A high-level, interpreted programming language that conforms to the ECMAScript specification." },
  { name: "TypeScript", description: "A typed superset of JavaScript that compiles to plain JavaScript." },
  { name: "Python", description: "An interpreted, high-level and general-purpose programming language." },
  { name: "Swift", description: "A powerful and intuitive programming language for macOS, iOS, watchOS, and tvOS." },
  { name: "PHP", description: "A popular general-purpose scripting language that is especially suited to web development." },
  { name: "Ruby", description: "A dynamic, open source programming language with a focus on simplicity and productivity." },
  { name: "Kotlin", description: "A cross-platform, statically typed, general-purpose programming language with type inference." },
  { name: "C#", description: "A general-purpose, multi-paradigm programming language encompassing static typing, strong typing, lexically scoped, imperative, declarative, functional, generic, object-oriented (class-based), and component-oriented programming disciplines." },
  { name: "C++", description: "A general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language, or 'C with Classes'." },
  { name: "C", description: "A general-purpose, procedural computer programming language supporting structured programming, lexical variable scope, and recursion, with a static type system." },
  { name: "Go", description: "A statically typed, compiled programming language designed at Google." },
  { name: "Vanilla JavaScript", description: "Plain JavaScript without any frameworks or libraries, using the core language and browser APIs directly." },
];

const frontend = [
  { name: "ReactJS", description: "A JavaScript library for building user interfaces." },
  { name: "HTML", description: "The standard markup language for documents designed to be displayed in a web browser." },
  { name: "NextJS", description: "A React framework for building server-side rendered and static web applications." },
  { name: "Redux", description: "A predictable state container for JavaScript apps." },
  { name: "Tailwind CSS", description: "A utility-first CSS framework for rapidly building custom user interfaces." },
  { name: "Tailwind UI", description: "A component library built on top of Tailwind CSS." },
  { name: "Angular", description: "A platform for building mobile and desktop web applications." },
  { name: "Axios", description: "A promise-based HTTP client for the browser and node.js." },
  { name: "CSS Modules", description: "A CSS file in which all class names and animation names are scoped locally by default." },
  { name: "Styled Components", description: "A library for React and React Native that allows you to use component-level styles in your application that are written with a mixture of JavaScript and CSS." },
  { name: "Webpack", description: "A static module bundler for modern JavaScript applications." },
  { name: "SCSS", description: "A preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets (CSS)." },
  { name: "D3", description: "A JavaScript library for producing dynamic, interactive data visualizations in web browsers." },
  { name: "AG Grid", description: "A feature-rich datagrid for React, Angular, Vue, and JavaScript." },
  { name: "Context API", description: "A React structure that allows you to share state across the entire app." },
  { name: "CSS3", description: "The latest evolution of the Cascading Style Sheets language." },
  { name: "HTML5", description: "The latest evolution of the standard that defines HTML." },
  { name: "CSS", description: "A stylesheet language used to describe the presentation of a document written in a markup language like HTML." },
  { name: "StoryBook", description: "An open source tool for developing UI components in isolation for React, Vue, and Angular." },
  { name: "React Hooks", description: "Functions that let you “hook into” React state and lifecycle features from function components." },
  { name: "MaterialUI", description: "A popular React UI framework." },
  { name: "React Query", description: "A library for fetching, caching, synchronizing and updating server state in React applications." },
  { name: "Turborepo", description: "A high-performance build system for JavaScript and TypeScript codebases." },
  { name: "Vite", description: "A build tool that aims to provide a faster and leaner development experience for modern web projects." },
  { name: "CSS-in-JS", description: "A styling paradigm where CSS is composed with JavaScript instead of being defined in external files." },
  { name: "WebSocket", description: "A computer communications protocol, providing full-duplex communication channels over a single TCP connection." },
  { name: "Figma", description: "A vector graphics editor and prototyping tool." },
  { name: "SASS", description: "A preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets (CSS)." },
  { name: "SSR", description: "Server-Side Rendering is the ability of an application to contribute to displaying a web-page on the server instead of rendering it in the browser." },
  { name: "Zod", description: "A TypeScript-first schema declaration and validation library." },
  { name: "Puppeteer", description: "A Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol." },
  { name: "Lighthouse", description: "An open-source, automated tool for improving the quality of web pages." },
  { name: "Web Worker", description: "A script that runs in the background, independently of other scripts, without affecting the performance of the page." },
  { name: "Tanstack Query", description: "A powerful data-synchronization library for React, Solid, Svelte and Vue." },
  { name: "XState", description: "A library for creating, interpreting, and executing finite state machines and statecharts." },
  { name: "Tanstack Virtual", description: "A library for virtualizing large lists and grids in React, Solid, Svelte and Vue." },
  { name: "SSG", description: "Static Site Generation is the process of generating a full static HTML website based on raw data and a set of templates." },
  { name: "Next.js", description: "A React framework for building server-side rendered and static web applications." },
  { name: "React", description: "A JavaScript library for building user interfaces using a component-based architecture." },
  { name: "Tailwind", description: "A utility-first CSS framework for rapidly building custom user interfaces." },
  { name: "Recharts", description: "A composable charting library built on React components and powered by D3." },
  { name: "React Context API", description: "A React feature for sharing state across the component tree without prop drilling." },
  { name: "Astro", description: "A web framework for building fast, content-driven websites using an islands architecture." },
  { name: "CustomTkinter", description: "A modern and customizable Python UI library based on Tkinter, offering beautiful widgets and themes." },
];

const backend = [
  { name: "NodeJS", description: "A JavaScript runtime built on Chrome's V8 JavaScript engine." },
  { name: "ExpressJS", description: "A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications." },
  { name: "tRPC", description: "A framework for building end-to-end typesafe APIs." },
  { name: "Django", description: "A high-level Python Web framework that encourages rapid development and clean, pragmatic design." },
  { name: "Symfony", description: "A PHP web application framework and a set of reusable PHP components/libraries." },
  { name: "Ruby On Rails", description: "A server-side web application framework written in Ruby under the MIT License." },
  { name: "NestJS", description: "A progressive Node.js framework for building efficient, reliable and scalable server-side applications." },
  { name: "Kotlin Multiplatform", description: "A feature of the Kotlin programming language that allows developers to share code between different platforms." },
  { name: "Stripe", description: "A suite of payment APIs that powers commerce for online businesses of all sizes." },
  { name: "Clerk", description: "A developer-first authentication and user management platform." },
  { name: "Convex", description: "A full-stack TypeScript development platform with a real-time reactive database." },
  { name: "Convex Auth", description: "An authentication solution built for Convex applications." },
  { name: "Express", description: "A minimal and flexible Node.js web application framework for building APIs and web apps." },
  { name: "Nuitka", description: "A Python compiler that converts Python code to C/C++ and creates standalone executables with improved performance." },
  { name: "Watchdog", description: "A Python library and shell utilities to monitor file system events in real-time." },
];

const mobile = [
  { name: "React Native", description: "A framework for building native apps with React." },
];

const databases = [
  { name: "PostgreSQL", description: "A powerful, open source object-relational database system." },
  { name: "NoSQL", description: "A database that provides a mechanism for storage and retrieval of data that is modeled in means other than the tabular relations used in relational databases." },
  { name: "MongoDB", description: "A source-available cross-platform document-oriented database program." },
  { name: "Mongoose", description: "A MongoDB object modeling tool designed to work in an asynchronous environment." },
  { name: "GraphQL", description: "A query language for APIs and a runtime for fulfilling those queries with your existing data." },
  { name: "REST", description: "An architectural style that defines a set of constraints to be used for creating web services." },
  { name: "Hasura", description: "An open-source engine that connects to your databases & microservices and instantly gives you a production-ready GraphQL API." },
  { name: "MySQL", description: "An open-source relational database management system." },
  { name: "SQL", description: "A domain-specific language used in programming and designed for managing data held in a relational database management system." },
  { name: "Prisma", description: "A next-generation ORM for Node.js and TypeScript." },
  { name: "Doctrine", description: "A set of PHP libraries primarily focused on providing an object-relational mapper and a database abstraction layer." },
  { name: "DynamoDB", description: "A fully managed proprietary NoSQL database service that supports key-value and document data structures." },
  { name: "S3", description: "Amazon Simple Storage Service is a service offered by Amazon Web Services that provides object storage through a web service interface." },
  { name: "Apollo", description: "A platform for building a supergraph, a unified network of all your data, services, and capabilities." },
  { name: "Redis", description: "An in-memory data structure store, used as a database, cache, and message broker." },
];

const cloud = [
  { name: "Git", description: "A free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency." },
  { name: "GitHub", description: "A provider of Internet hosting for software development and version control using Git." },
  { name: "GitLab", description: "A web-based DevOps lifecycle tool that provides a Git-repository manager providing wiki, issue-tracking and continuous integration/continuous delivery pipeline features." },
  { name: "CI/CD", description: "Continuous Integration and Continuous Delivery is a method to frequently deliver apps to customers by introducing automation into the stages of app development." },
  { name: "AWS AppSync", description: "A fully managed service that makes it easy to develop GraphQL APIs by handling the heavy lifting of securely connecting to data sources like AWS DynamoDB, Lambda, and more." },
  { name: "AWS Amplify", description: "A set of tools and services that can be used together or on their own, to help front-end web and mobile developers build scalable full stack applications, powered by AWS." },
  { name: "AWS Lambda", description: "A serverless computing service that lets you run code without provisioning or managing servers." },
  { name: "AWS EC2", description: "Amazon Elastic Compute Cloud is a service that provides secure, resizable compute capacity in the cloud." },
  { name: "AWS S3", description: "Amazon Simple Storage Service is a service offered by Amazon Web Services that provides object storage through a web service interface." },
  { name: "Docker", description: "A set of platform as a service products that use OS-level virtualization to deliver software in packages called containers." },
  { name: "Vercel", description: "A cloud platform for static sites and Serverless Functions that fits perfectly with your workflow." },
  { name: "GitHub Actions", description: "A CI/CD platform for automating build, test, and deployment workflows directly from GitHub repositories." },
];

const testing = [
  { name: "Jest", description: "A delightful JavaScript Testing Framework with a focus on simplicity." },
  { name: "Enzyme", description: "A JavaScript Testing utility for React that makes it easier to test your React Components' output." },
  { name: "Cypress", description: "A next generation front end testing tool built for the modern web." },
  { name: "React Testing Library", description: "A set of helpers that let you test React components without relying on their implementation details." },
  { name: "TDD", description: "Test-driven development is a software development process that relies on the repetition of a very short development cycle." },
];

const ai = [
  { name: "Ollama (Local LLM Deployment)", description: "A tool for running large language models locally." },
  { name: "TensorFlow.js (Node)", description: "A library for machine learning in JavaScript." },
  { name: "Upscaler.js (ESRGAN-Slim)", description: "A library for upscaling images in JavaScript." },
  { name: "crewAI", description: "A framework for orchestrating role-playing, autonomous AI agents." },
  { name: "GitHub Copilot", description: "An AI pair programmer that helps you write code faster and with less work." },
  { name: "TensorFlow.js", description: "A library for machine learning in JavaScript, enabling training and deployment of ML models in the browser and Node.js." },
  { name: "Upscaler.js", description: "A JavaScript library for upscaling images using neural network models." },
  { name: "Ollama", description: "A tool for running large language models locally on your machine." },
  { name: "Astropy", description: "A community Python library for astronomy, providing tools for astronomical calculations and data analysis." },
];

const ide = [
  { name: "VS Code", description: "A code editor redefined and optimized for building and debugging modern web and cloud applications." },
  { name: "Cursor", description: "An AI-first code editor." },
];

export const allTech = [
  ...programmingLanguages,
  ...frontend,
  ...backend,
  ...mobile,
  ...databases,
  ...cloud,
  ...testing,
  ...ai,
  ...ide,
];

export const techDescriptions = allTech.reduce((acc, tech) => {
  acc[tech.name] = tech.description;
  return acc;
}, {} as Record<string, string>);

export const getTechCategory = (tech: string) => {
  if (programmingLanguages.some((t) => t.name === tech)) return "Programming Language";
  if (frontend.some((t) => t.name === tech)) return "Frontend";
  if (backend.some((t) => t.name === tech)) return "Backend";
  if (mobile.some((t) => t.name === tech)) return "Mobile";
  if (databases.some((t) => t.name === tech)) return "Database";
  if (cloud.some((t) => t.name === tech)) return "Cloud";
  if (testing.some((t) => t.name === tech)) return "Testing";
  if (ai.some((t) => t.name === tech)) return "AI/ML";
  if (ide.some((t) => t.name === tech)) return "IDE";
  return "Other";
};

export const getCategoryStyle = (category: string) => {
  switch (category) {
    case "Programming Language":
      return {
        shadow: "shadow-blue-500/20",
        text: "text-blue-300",
        gradient: "from-blue-500 to-cyan-500",
        bg: "bg-blue-500/10",
        border: "border-blue-400/30",
      };
    case "Frontend":
      return {
        shadow: "shadow-cyan-500/20",
        text: "text-cyan-300",
        gradient: "from-cyan-500 to-green-500",
        bg: "bg-cyan-500/10",
        border: "border-cyan-400/30",
      };
    case "Backend":
      return {
        shadow: "shadow-green-500/20",
        text: "text-green-300",
        gradient: "from-green-500 to-emerald-500",
        bg: "bg-green-500/10",
        border: "border-green-400/30",
      };
    case "Mobile":
      return {
        shadow: "shadow-purple-500/20",
        text: "text-purple-300",
        gradient: "from-purple-500 to-pink-500",
        bg: "bg-purple-500/10",
        border: "border-purple-400/30",
      };
    case "Database":
      return {
        shadow: "shadow-pink-500/20",
        text: "text-pink-300",
        gradient: "from-pink-500 to-red-500",
        bg: "bg-pink-500/10",
        border: "border-pink-400/30",
      };
    case "Cloud":
      return {
        shadow: "shadow-orange-500/20",
        text: "text-orange-300",
        gradient: "from-orange-500 to-yellow-500",
        bg: "bg-orange-500/10",
        border: "border-orange-400/30",
      };
    case "Testing":
      return {
        shadow: "shadow-yellow-500/20",
        text: "text-yellow-300",
        gradient: "from-yellow-500 to-lime-500",
        bg: "bg-yellow-500/10",
        border: "border-yellow-400/30",
      };
    case "AI/ML":
      return {
        shadow: "shadow-red-500/20",
        text: "text-red-300",
        gradient: "from-red-500 to-rose-500",
        bg: "bg-red-500/10",
        border: "border-red-400/30",
      };
    case "IDE":
      return {
        shadow: "shadow-indigo-500/20",
        text: "text-indigo-300",
        gradient: "from-indigo-500 to-violet-500",
        bg: "bg-indigo-500/10",
        border: "border-indigo-400/30",
      };
    default:
      return {
        shadow: "shadow-gray-500/20",
        text: "text-gray-300",
        gradient: "from-gray-500 to-slate-500",
        bg: "bg-gray-500/10",
        border: "border-gray-400/30",
      };
  }
};