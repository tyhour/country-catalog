import { Table, Input, InputGroup, Pagination } from "rsuite";
import React from "react";
import SearchIcon from "@rsuite/icons/Search";
import {
  AltSpellingCell,
  CallingCodeCell,
  ImageCell,
  IndexCell,
  NativeNameCell,
} from "./components";
import ModelCountry from "./ModelCountry";

const { Column, HeaderCell, Cell } = Table;

const styles = {
  width: 300,
  marginBottom: 20,
};

const DataTable = ({ isLoading, data }) => {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(25);

  const [sortType, setSortType] = React.useState("asc");
  const [search, setSearch] = React.useState("");

  const getData = () => {
    if (!isLoading) {
      const reg = new RegExp(`.*${search.toLowerCase()}.*`);
      const filterData = data.filter((item) =>
        item?.name?.official.toLowerCase().match(reg)
      );
      if (sortType) {
        return filterData.sort((a, b) => {
          let x = a?.name?.official;
          let y = b?.name?.official;
          if (typeof x === "string") {
            x = x.charCodeAt();
          }
          if (typeof y === "string") {
            y = y.charCodeAt();
          }
          if (sortType === "asc") {
            return x - y;
          } else {
            return y - x;
          }
        });
      }
      return filterData;
    }
    return [];
  };

  const countryData = getData().filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  const handleSortColumn = (_, sortType) => {
    setSortType(sortType);
  };

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  return (
    <>
      <div className="wrap-search">
        <InputGroup style={styles}>
          <Input placeholder="Search country name..." onChange={setSearch} />
          <InputGroup.Button>
            <SearchIcon />
          </InputGroup.Button>
        </InputGroup>
      </div>
      <div style={{ padding: 20 }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          layout={["total", "-", "limit", "|", "pager", "skip"]}
          total={getData().length}
          limitOptions={[25, 50, 75]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
      <Table
        autoHeight
        data={countryData}
        rowKey="name.official"
        sortType={sortType}
        onSortColumn={handleSortColumn}
        loading={isLoading}
      >
        <Column width={80} align="center">
          <HeaderCell>No</HeaderCell>
          <IndexCell page={(page - 1) * limit} />
        </Column>
        <Column width={80} align="center">
          <HeaderCell>Flags</HeaderCell>
          <ImageCell dataKey="png" />
        </Column>

        <Column width={300} flexGrow={1} sortable>
          <HeaderCell>Country Name</HeaderCell>
          <ModelCountry />
        </Column>

        <Column width={120}>
          <HeaderCell>Code (CCA2)</HeaderCell>
          <Cell dataKey="cca2" align="center" />
        </Column>

        <Column width={120}>
          <HeaderCell>Code (CCA3)</HeaderCell>
          <Cell dataKey="cca3" align="center" />
        </Column>

        <Column width={200}>
          <HeaderCell>Native Name</HeaderCell>
          <NativeNameCell dataKey="nativeName" />
        </Column>

        <Column width={250}>
          <HeaderCell>Alternative Name</HeaderCell>
          <AltSpellingCell dataKey="altSpellings" />
        </Column>

        <Column width={140}>
          <HeaderCell>Calling Codes</HeaderCell>
          <CallingCodeCell dataKey="idd" align="center" />
        </Column>
      </Table>
    </>
  );
};

export default DataTable;
