import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { VisitFilters } from "../../components/customComponents/VisitFilters";
import { VisitsTable } from "../../components/tables/BasicTables/BasicTableOne";
import { useVisit } from "../../hooks/useVisit";
import Button from "../../components/ui/button/Button";

export default function VisitsPage() {
  const { resetFilters } = useVisit();

  return (
    <>
      <PageMeta title="Visits" description="All visits recorded" />
      <PageBreadcrumb pageTitle="Visits" />

      <div className="space-y-6">
        <ComponentCard title="Filter Visits">
          <div className="flex flex-col gap-4">
            <VisitFilters />

            {/* Clear Filters */}
            <div className="flex justify-end">
              <Button variant="outline" onClick={resetFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard title="Visits">
          <VisitsTable  />
        </ComponentCard>
      </div>
    </>
  );
}