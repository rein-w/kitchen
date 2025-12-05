"use client";

import { useState, useMemo, useCallback } from "react";

interface MenuItem {
  name: string;
  description?: string;
}

interface EventData {
  id: string;
  name: string;
  date: string;
  menu: MenuItem[];
}

const eventsData: EventData[] = [
  {
    id: "1",
    name: "Bowling and Darts",
    date: "2025-12-06",
    menu: [
      { name: "A.P. sourdough" },
      { name: "Sydney rock oyster" },
      { name: "Kingfish crudo, navel oranges" },
      { name: "Straciatella, black plum, fennel seeds" },
      { name: "Australian banana prawn cakes, panko" },
      { name: "---" },
      { name: "Duck breast, pomelo salad" },
      { name: "NY strip wagyu" },
      { name: "Conchigliette, lemon, parsley" },
      { name: "Roasted cabbage, artichoke, eggplant, chilli" },
      { name: "---" },
      { name: "Flan" },
      { name: "Melona" },
    ],
  },
];

function formatDate(dateString: string, short: boolean = false): string {
  const date = new Date(dateString);
  if (short) {
    return date.toLocaleDateString("en-AU", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  return date.toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getMonthYear(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-AU", { month: "long", year: "numeric" });
}

export default function EventsPage() {
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filterOptions = useMemo(() => {
    const months = new Set<string>();
    eventsData.forEach((event) => {
      months.add(getMonthYear(event.date));
    });
    return ["all", ...Array.from(months)];
  }, []);

  const filteredEvents = useMemo(() => {
    if (selectedFilter === "all") return eventsData;
    return eventsData.filter(
      (event) => getMonthYear(event.date) === selectedFilter
    );
  }, [selectedFilter]);

  const toggleEvent = useCallback((eventId: string) => {
    setExpandedEvents((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  }, []);

  return (
    <div className="bg-white pt-10 md:pt-16 pb-12 md:pb-24">
      <div className="px-4 sm:px-8 lg:px-16 max-w-4xl mx-auto">
        <h1
          className="text-3xl md:text-4xl font-light text-black tracking-wide mb-10 md:mb-14"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Events
        </h1>

        {/* Date Filter */}
        <div className="mb-8 md:mb-12 -mx-4 sm:mx-0">
          <div className="flex gap-2 sm:gap-3 overflow-x-auto px-4 sm:px-0 pb-2 sm:pb-0 sm:flex-wrap scrollbar-hide">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2.5 text-[13px] font-light transition-colors border whitespace-nowrap flex-shrink-0 touch-manipulation ${
                  selectedFilter === filter
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-600 border-gray-300 hover:border-black active:border-black"
                }`}
              >
                {filter === "all" ? "All Events" : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-4 sm:space-y-6">
          {filteredEvents.map((event) => {
            const isExpanded = expandedEvents.has(event.id);
            return (
              <div
                key={event.id}
                className="border border-gray-200 bg-white"
              >
                {/* Event Header */}
                <div className="px-5 py-5 md:px-6 md:py-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h2 className="text-lg md:text-xl font-light text-black mb-1.5">
                        {event.name}
                      </h2>
                      <p className="text-[13px] text-gray-500 font-light">
                        <span className="sm:hidden">{formatDate(event.date, true)}</span>
                        <span className="hidden sm:inline">{formatDate(event.date)}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => toggleEvent(event.id)}
                      className="ml-4 w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black active:text-black transition-colors touch-manipulation"
                      aria-label={isExpanded ? "Collapse menu" : "Expand menu"}
                    >
                      <span className="text-2xl font-light select-none">
                        {isExpanded ? "−" : "+"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Expandable Menu */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-5 md:px-6 md:pb-6 border-t border-gray-100">
                    <div className="pt-5 space-y-4">
                      <p className="text-[12px] text-gray-400 uppercase tracking-wider font-light">
                        Menu
                      </p>
                      <div className="space-y-2.5">
                        {event.menu.map((item, index) => {
                          const key = `${event.id}-menu-${index}`;
                          return item.name === "---" ? (
                            <div key={key} className="py-2" />
                          ) : (
                            <div key={key} className="flex flex-col">
                              <span className="text-[14px] text-black font-light">
                                {item.name}
                              </span>
                              {item.description && (
                                <span className="text-[13px] text-gray-500 font-light">
                                  {item.description}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <p className="text-center text-gray-500 font-light text-[14px] py-12">
            No events found for this period.
          </p>
        )}
      </div>
    </div>
  );
}
