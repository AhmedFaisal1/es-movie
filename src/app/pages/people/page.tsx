'use client'
import React, { useEffect, useState } from "react";
import MaxWidthLayout from "@/app/layouts/MaxWidthLayout";
import NavbarFooterIncluded from "@/app/layouts/NavbarFooterIncluded";
import TopSection from "@/app/layouts/TopSection";
import Pagination from "@/app/components/Pagination";
import PersonCard from "@/app/components/PersonCard";
import { getPeople } from "@/app/services/api";

type Person = {
  id: number;
  name: string;
  // Add other properties as needed
};

type PeopleResponse = {
  results: Person[];
  total_pages: number;
  total_results: number;
};

const People: React.FC = () => {
  const [people, setPeople] = useState<PeopleResponse | undefined>(undefined);

  /**
   * For pagination...
   */
  const [page, setPage] = useState<number>(0);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const moviesPerPage = 20;
  const numberOfRecordsVisited = page * moviesPerPage;
  const totalPagesCalculated = people ? Math.ceil(people.total_results / moviesPerPage) : 0;

  const handlePageChange = (providedPage: number) => {
    setSelectedPage(providedPage);
  };

  useEffect(() => {
    (async function () {
      const { results: peopleResults, total_pages, total_results } = await getPeople(selectedPage);
      peopleResults &&
        setPeople({
          results: peopleResults,
          total_pages,
          total_results,
        });
    })();
  }, [selectedPage]);

  console.log(people);

  return (
    <NavbarFooterIncluded>
      <MaxWidthLayout>
        <TopSection>
          <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:items-center md:space-x-5 md:justify-between">
            <h2 className="text-3xl uppercase font-AtypDisplayBold">People</h2>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 md:gap-10">
            {people?.results
              .slice(numberOfRecordsVisited, numberOfRecordsVisited + moviesPerPage)
              ?.map((singlePerson: Person) => {
                return <PersonCard key={singlePerson.id} singlePerson={singlePerson} />;
              })}
          </div>
          <div>
            <Pagination totalPagesCalculated={totalPagesCalculated} handlePageChange={handlePageChange} />
          </div>
        </TopSection>
      </MaxWidthLayout>
    </NavbarFooterIncluded>
  );
};

export default People;
