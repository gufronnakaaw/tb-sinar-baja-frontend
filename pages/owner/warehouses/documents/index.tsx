import { Button } from "@nextui-org/react";
import { Eye, Pencil, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/router";

// components
import CustomTooltip from "@/components/tooltip";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import usePagination from "@/hooks/usepagination";

import { WarehouseDocuments, warehouseDocuments } from "@/_dummy/warehouses";
import { TemplateSuratJalan } from "@/components/template/TemplateSuratJalan";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function WarehousesDocumentsPage() {
  const router = useRouter();
  const { page, pages, data, setPage } = usePagination(warehouseDocuments, 10);

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const columns = [
    { name: "Invoice", uid: "invoice", sortable: false },
    { name: "Ke", uid: "to", sortable: true },
    { name: "Aksi", uid: "action", sortable: false },
  ];

  const renderCell = (
    warehouseDocuments: WarehouseDocuments,
    columnKey: React.Key,
  ) => {
    const cellValue = warehouseDocuments[columnKey as keyof WarehouseDocuments];

    switch (columnKey) {
      case "invoice":
        return (
          <div className="text-default-900">{warehouseDocuments.invoice}</div>
        );
      case "to":
        return (
          <div className="line-clamp-1 w-max max-w-[250px] text-default-900">
            {warehouseDocuments.to}
          </div>
        );
      case "action":
        return (
          <div className="flex max-w-[110px] items-center gap-1">
            <CustomTooltip content="Detail">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() =>
                  router.push(
                    `/owner/warehouses/documents/${warehouseDocuments.invoice}`,
                  )
                }
              >
                <Eye weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>

            <CustomTooltip content="Edit">
              <Button isIconOnly variant="light" size="sm">
                <Pencil weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>

            <CustomTooltip content="Hapus">
              <Button isIconOnly variant="light" color="danger" size="sm">
                <Trash weight="bold" size={20} />
              </Button>
            </CustomTooltip>
          </div>
        );

      default:
        return cellValue;
    }
  };

  return (
    <Layout title="Surat Jalan">
      <Container className="gap-8">
        {/* <h4 className="text-lg font-semibold text-default-900">Surat Jalan</h4> */}

        <div className="grid gap-4">
          {/* <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari surat jalan..."
              className="w-full sm:max-w-[500px]"
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
            >
              Buat Surat Jalan
            </Button>
          </div> */}
          {/* <Table
            isHeaderSticky
            aria-label="warehouseDocuments table"
            color="primary"
            selectionMode="single"
            classNames={customStyleTable}
            className="scrollbar-hide"
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={data}>
              {(warehouseDocuments) => (
                <TableRow key={warehouseDocuments.invoice}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCell(warehouseDocuments, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Pagination
            isCompact
            showControls
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
            className="justify-self-center"
          /> */}

          <Button
            variant="solid"
            color="primary"
            className="w-full justify-self-end font-medium sm:w-max"
            onClick={handlePrint}
          >
            Print
          </Button>
          <TemplateSuratJalan ref={componentRef} />
        </div>
      </Container>
    </Layout>
  );
}
