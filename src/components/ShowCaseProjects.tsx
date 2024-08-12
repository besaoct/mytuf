'use client'

import React from 'react';
import Link from 'next/link';

interface Project {
  name: string;
  date: string;
  description: string;
  link: string;
}

const projects: Project[] = [
  {
    name: 'create-espkg',
    date: 'Aug 2024',
    description: 'A CLI tool for creating npm packages with support for JavaScript/TypeScript and React/Next.js projects, leveraging esbuild for fast and efficient builds.',
    link: 'https://create-espkg.vercel.app',
  },
  {
    name: 'Justy',
    date: 'Aug 2024',
    description: '`justy` is a versatile utility library for simplifying array and object operations, conversions, date and time manipulations, and general-purpose tasks in JavaScript and TypeScript applications.',
    link: 'https://npmjs.com/package/justy',
  },
  {
    name: 'Qeoro',
    date: 'Aug 2024',
    description: 'An AI-powered social media platform connecting students, patients, doctors, and health-conscious individuals within the healthcare community.',
    link: 'https://qeoro.vercel.app',
  },
  {
    name: 'Horofy',
    date: 'May 2024',
    description: 'A PWA platform for freelancing, selling merchandise or digital products, and exploring job opportunities, featuring role-based dashboards and integrated generative AI.',
    link: 'https://horofy.com',
  },
  {
    name: 'genfunc',
    date: 'Aug 2024',
    description: 'A collection of high-performance, framework-agnostic functions to simplify common programming tasks like delaying function execution, caching results, and more.',
    link: 'https://npmjs.com/package/genfunc',
  },
  {
    name: 'Next-react-share',
    date: 'Aug 2024',
    description: 'A React component for sharing content via the Web Share API or copying to the clipboard, designed for React and Next.js applications.',
    link: 'https://npmjs.com/package/next-react-share',
  },
  {
    name: 'Nuniq',
    date: 'Aug 2024',
    description: 'A TypeScript-compatible node package for generating unique/random names, usernames, and random strings with customizable configurations.',
    link: 'https://npmjs.com/package/nuniq',
  },
  {
    name: 'aippy!',
    date: 'Jul 2024',
    description: 'A recipe search app with voice search functionality, displaying ingredients, categories, steps, and YouTube video tutorials for any dish.',
    link: 'https://aippy.vercel.app',
  },
  {
    name: 'Resayai',
    date: 'Jul 2024',
    description: 'An AI-powered Resume Generator that creates ATS-friendly resumes based on user inputs, allowing for edits, printing, or downloading.',
    link: 'https://resayai.vercel.app',
  },
  {
    name: 'Shinjs - AI powered JavaScript Runner',
    date: 'Jul 2024',
    description: 'A TypeScript generative AI project that converts human-readable texts into browser-understandable code, displaying output based on user inputs.',
    link: 'https://shinjs.vercel.app',
  },
  {
    name: 'Prosmart',
    date: 'Dec 2023 - Feb 2024',
    description: 'A platform of AI-integrated productivity tools for enhancing the productivity of learners, educators, and professionals, including an AI-assisted digital notebook, ChatWithPDF, and more.',
    link: 'https://prosmart.vercel.app',
  },
];

const Projects: React.FC = () => {
  return (
    <div className="space-y-6 p-6 bg-white dark:bg-black rounded-md shadow-sm">
      <h2 className="text-lg font-medium mb-4">Projects</h2>
      <ul className="space-y-4">
        {projects.map((project, index) => (
          <li key={index} className="border-b pb-4 last:border-b-0">
            <h3 className="text-base font-medium">
              <Link href={project.link} passHref target="_blank" rel="noopener noreferrer" className="hover:underline text-red-600 dark:text-red-400">
                {project.name}
              </Link>
            </h3>
            <p className="text-sm text-muted-foreground">{project.date}</p>
            <p className="mt-2 text-base text-muted-foreground/80">{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
