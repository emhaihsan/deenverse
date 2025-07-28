// components/doa/FilterSidebar.tsx
"use client";

import { useEffect, useState } from "react";
import { getDoaList } from "@/lib/api/doa";
import { Doa } from "@/types/doa";
import { ChevronDown, ChevronRight, Filter } from "lucide-react";

type FilterState = {
  categories: string[];
  tags: string[];
  selectedCategories: string[];
  selectedTags: string[];
  isCategoryOpen: boolean;
  isTagOpen: boolean;
};

export default function FilterSidebar({
  onFilterChange,
}: {
  onFilterChange: (filters: { categories: string[]; tags: string[] }) => void;
}) {
  const [state, setState] = useState<FilterState>({
    categories: [],
    tags: [],
    selectedCategories: [],
    selectedTags: [],
    isCategoryOpen: true,
    isTagOpen: true,
  });

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await getDoaList({});
        const doas: Doa[] = response.data || [];

        // Extract unique categories
        const categories = Array.from(
          new Set(doas.map((doa) => doa.grup).filter(Boolean))
        ) as string[];

        // Extract and flatten all tags, then get unique ones
        const allTags = doas.flatMap((doa) => doa.tag || []);
        const uniqueTags = Array.from(new Set(allTags));

        setState((prev) => ({
          ...prev,
          categories,
          tags: uniqueTags,
        }));
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, []);

  const toggleCategory = (category: string) => {
    const newSelectedCategories = state.selectedCategories.includes(category)
      ? state.selectedCategories.filter((c) => c !== category)
      : [...state.selectedCategories, category];

    setState((prev) => ({
      ...prev,
      selectedCategories: newSelectedCategories,
    }));

    onFilterChange({
      categories: newSelectedCategories,
      tags: state.selectedTags,
    });
  };

  const toggleTag = (tag: string) => {
    const newSelectedTags = state.selectedTags.includes(tag)
      ? state.selectedTags.filter((t) => t !== tag)
      : [...state.selectedTags, tag];

    setState((prev) => ({
      ...prev,
      selectedTags: newSelectedTags,
    }));

    onFilterChange({
      categories: state.selectedCategories,
      tags: newSelectedTags,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2 text-emerald-700">
          <Filter className="h-4 w-4" />
          <h3 className="font-medium">Filter</h3>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {/* Categories */}
        <div className="p-4">
          <button
            className="w-full flex items-center justify-between text-left font-medium text-gray-800 mb-2"
            onClick={() =>
              setState((prev) => ({
                ...prev,
                isCategoryOpen: !prev.isCategoryOpen,
              }))
            }
          >
            <span>Kategori</span>
            {state.isCategoryOpen ? (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            )}
          </button>

          {state.isCategoryOpen && (
            <div className="space-y-2 mt-2">
              {state.categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-1 rounded"
                >
                  <input
                    type="checkbox"
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                    checked={state.selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                  />
                  <span className="truncate">{category}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="p-4">
          <button
            className="w-full flex items-center justify-between text-left font-medium text-gray-800 mb-2"
            onClick={() =>
              setState((prev) => ({
                ...prev,
                isTagOpen: !prev.isTagOpen,
              }))
            }
          >
            <span>Tag</span>
            {state.isTagOpen ? (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            )}
          </button>

          {state.isTagOpen && (
            <div className="mt-2">
              <div className="flex flex-wrap gap-2">
                {state.tags.map((tag) => (
                  <button
                    key={tag}
                    className={`text-xs px-2 py-1 rounded-full ${
                      state.selectedTags.includes(tag)
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
