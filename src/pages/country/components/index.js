import { Table } from "rsuite";

const { Cell } = Table;
export const ImageCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div className="flags">
      <img src={rowData?.flags[dataKey]} width="50" alt="Country Catelog" />
    </div>
  </Cell>
);

export const IndexCell = ({ rowData, rowIndex, page = 0, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div className="rs-table-cell-content">{rowIndex + 1 + page}</div>
  </Cell>
);

export const CallingCodeCell = ({ rowData, dataKey, page, ...props }) => {
  const idd = rowData[dataKey];
  let code = "";
  if (idd.suffixes?.length === 1) {
    code = `${idd?.root}${idd?.suffixes[0]}`;
  } else
    code = (idd?.suffixes ?? [])
      .map((suffix) => `${idd.root}(${suffix})`)
      .join(", ");
  return (
    <Cell {...props} style={{ padding: 0 }}>
      <div className="rs-table-cell-content" title={code}>
        {code}
      </div>
    </Cell>
  );
};

export const AltSpellingCell = ({ rowData, dataKey, ...props }) => {
  const value = (rowData[dataKey] ?? []).join(", ");
  return (
    <Cell {...props} style={{ padding: 0 }}>
      <div className="rs-table-cell-content" title={value}>
        {value}
      </div>
    </Cell>
  );
};

export const NativeNameCell = ({ rowData, dataKey, ...props }) => {
  const value = rowData.name[dataKey]
    ? rowData.name[dataKey][Object.keys(rowData.name[dataKey])[0]]["official"]
    : "";
  return (
    <Cell {...props} style={{ padding: 0 }}>
      <div className="rs-table-cell-content" title={value}>
        {value}
      </div>
    </Cell>
  );
};
