// components/doa/CompactFilter.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { getDoaList } from "@/lib/api/doa";
import { Doa } from "@/types/doa";
import { Filter, ChevronDown, X } from "lucide-react";

type FilterState = {
  categories: string[];
  tags: string[];
  selectedCategories: string[];
  selectedTags: string[];
  isOpen: boolean;
};

export default function CompactFilter({
  onFilterChange,
}: {
  onFilterChange: (filters: { categories: string[]; tags: string[] }) => void;
}) {
  const [state, setState] = useState<FilterState>({
    categories: [],
    tags: [],
    selectedCategories: [],
    selectedTags: [],
    isOpen: false,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setState((prev) => ({ ...prev, isOpen: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const clearAllFilters = () => {
    setState((prev) => ({
      ...prev,
      selectedCategories: [],
      selectedTags: [],
    }));

    onFilterChange({
      categories: [],
      tags: [],
    });
  };

  const hasActiveFilters =
    state.selectedCategories.length > 0 || state.selectedTags.length > 0;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setState((prev) => ({ ...prev, isOpen: !prev.isOpen }))}
        className={`flex items-center gap-2 px-3 py-2 border rounded-md text-sm font-medium transition-colors ${
          hasActiveFilters
            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        <Filter className="h-4 w-4" />
        <span>Filter</span>
        {hasActiveFilters && (
          <span className="bg-emerald-600 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center">
            {state.selectedCategories.length + state.selectedTags.length}
          </span>
        )}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            state.isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {state.isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {" "}
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Filter Doa</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  <X className="h-3 w-3" />
                  Hapus Semua
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Kategori
              </h4>
              <div className="max-h-32 overflow-y-auto space-y-1">
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
                    <span className="truncate text-xs">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Tag</h4>
              <div className="max-h-32 overflow-y-auto">
                <div className="flex flex-wrap gap-1">
                  {state.tags.map((tag) => (
                    <button
                      key={tag}
                      className={`text-xs px-2 py-1 rounded-full transition-colors ${
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
