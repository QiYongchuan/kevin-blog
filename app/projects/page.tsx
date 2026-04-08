'use client';

import { useState, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { getAllProjects } from '@/lib/api';
import { Project, ProjectCategory } from '@/types';

const categories: { value: ProjectCategory; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'commercial', label: '商单案例' },
  { value: 'personal', label: '个人作品' },
  { value: 'experiment', label: '实验项目' },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await getAllProjects();
      setProjects(data);
      setLoading(false);
    };
    loadProjects();
  }, []);

  // 过滤项目
  const filteredProjects = projects.filter(
    (project) => activeCategory === 'all' || project.category === activeCategory
  );

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-72 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Projects
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          我的作品和实验项目。
        </p>
      </header>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setActiveCategory(category.value)}
            className={`px-4 py-2 text-sm rounded-full transition-colors ${
              activeCategory === category.value
                ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Projects Grid - 3x3 Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 text-gray-400 dark:text-gray-500">
          该分类下暂无项目
        </div>
      )}
    </div>
  );
}
