'use client'

import Link from 'next/link';
import React from 'react';
import { FaFileAlt, FaCog, FaPenNib, FaYoutube, FaCode } from 'react-icons/fa';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const Card: React.FC<CardProps> = ({ icon, title, description, buttonText, buttonLink}) => {
  return (
    <div className="p-4 bg-white rounded-md shadow-sm dark:bg-black border flex flex-col w-full justify-between bg-gradient-to-r from-pink-50 via-red-100 to-orange-100 dark:from-black dark:via-neutral-950 dark:to-neutral-950">
      <div>
      <div className="text-4xl mb-4">
        {icon}
      </div>
      <h3 className="text-base font-bold text-foreground mb-2">{title}</h3>
      <p className=" text-muted-foreground mb-4">{description}</p>
      </div>
      <Link 
        href={buttonLink} 
        className={`inline-flex w-fit items-center justify-center px-4 py-2 text-sm font-medium rounded-md 
          bg-inherit border transition-all hover:bg-accent`}
      >
        {buttonText}
        <span className="ml-2">→</span>
      </Link>
    </div>
  );
};

const MainComponent: React.FC = () => {
  const cards = [
    {
      icon: <FaFileAlt className="text-blue-500" />,
      title: "Striver's DSA Sheet",
      description: "Boost your DSA skills with our handy cheat sheets.",
      buttonText: "Get started",
      buttonLink: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/",
    },
    {
      icon: <FaCog className="text-red-500" />,
      title: "System Design",
      description: "Design better systems with our simplified approach.",
      buttonText: "Get started",
      buttonLink: "https://takeuforward.org/system-design/complete-system-design-roadmap-with-videos-for-sdes/",
    },
    {
      icon: <FaPenNib className="text-yellow-500" />,
      title: "Technical Blogs",
      description: "Dive Deep into Tech Innovation with Our Engaging Blogs.",
      buttonText: "Get started",
      buttonLink: "https://takeuforward.org/blogs",
    },
    {
      icon: <FaYoutube className="text-red-600" />,
      title: "Striver's DSA Playlist",
      description: "Master algorithms effortlessly with our curated DSA playlist.",
      buttonText: "Watch Now",
      buttonLink: "https://takeuforward.org/array/top-array-interview-questions-structured-path-with-video-solutions/",
    },
    {
      icon: <FaCode className="text-purple-500" />,
      title: "CS Subjects",
      description: "Demystify CS topics with our easy-to-understand guides.",
      buttonText: "Get started",
      buttonLink: "https://takeuforward.org/dbms/most-asked-dbms-interview-questions/",
    },
    {
      icon: <FaFileAlt className="text-orange-500" />,
      title: "Striver's CP Sheet",
      description: "Level up your coding game with our practice resources.",
      buttonText: "Get started",
      buttonLink: "https://takeuforward.org/interview-experience/strivers-cp-sheet/",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <Card
          key={index}
          icon={card.icon}
          title={card.title}
          description={card.description}
          buttonText={card.buttonText}
          buttonLink={card.buttonLink}
        />
      ))}
    </div>
  );
};

export default MainComponent;
