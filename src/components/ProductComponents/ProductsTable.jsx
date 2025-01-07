import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  ButtonGroup,
  Button,
  CardMedia,
  Chip,
  TablePagination,
} from "@mui/material";
import { Delete, ModeEdit } from "@mui/icons-material";
import FormEdit from "./FormEditProduct";

export default function ProductTable({
  products,
  activarProducto,
  categories,
  setProducts,
}) {
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editID, setEditID] = React.useState(0);

  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }
  function handleClickEdit(id) {
    setOpenEdit(true);
    setEditID(id);
  }

  return (
    <>
      <TableContainer sx={{ mb: 4 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell align="right">Usuario</TableCell>
              <TableCell align="right">Categoria</TableCell>
              <TableCell align="right">Marca</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell align="right">Foto</TableCell>

              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(pg * rpg, pg * rpg + rpg).map((row) => (
              <TableRow
                key={row.ProductoID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.Nombre_Producto}
                </TableCell>
                <TableCell align="right">{row.Nombre}</TableCell>
                <TableCell align="right">{row.Nombre_Categoria}</TableCell>
                <TableCell align="right">{row.Marca}</TableCell>
                <TableCell align="right">{row.Stock}</TableCell>
                <TableCell align="right">
                  <Chip
                    label={row.Nombre_Estado}
                    onClick={() =>
                      activarProducto(row.ProductoID, row.FK_EstadoID)
                    }
                  />
                </TableCell>
                <TableCell align="right">Q.{row.Precio}</TableCell>
                <TableCell align="right">
                  <CardMedia component="img" height="30" image={row.Foto} />
                </TableCell>
                <TableCell align="right">
                  <ButtonGroup
                    variant="contained"
                    aria-label="Small button group"
                  >
                    <Button startIcon={<Delete />}></Button>
                    <Button
                      startIcon={<ModeEdit />}
                      onClick={() => handleClickEdit(row.ProductoID)}
                    ></Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <tfoot>
            <tr>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                //component="th"
                count={products.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </tr>
          </tfoot>
        </Table>
      </TableContainer>
      <FormEdit
        openEdit={openEdit}
        editID={editID}
        setOpenEdit={setOpenEdit}
        categories={categories}
        setProducts={setProducts}
      />
    </>
  );
}
