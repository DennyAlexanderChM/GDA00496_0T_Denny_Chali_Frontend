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
  Chip,
  TablePagination,
  Box,
  Typography,
} from "@mui/material";
import { Delete, ModeEdit } from "@mui/icons-material";
import FormEdit from "./FormEditCategory";

export default function Users({ categories, activarCategoria, setCategories }) {
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
              <TableCell>Categoría</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Fecha creación</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.slice(pg * rpg, pg * rpg + rpg).map((row) => (
              <TableRow
                key={row.CategoriaID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.Nombre_Categoria}
                </TableCell>
                <TableCell align="right">
                  <Chip
                    label={row.FK_EstadosID === 1 ? "Activo" : "Inactivo"}
                    onClick={() =>
                      activarCategoria(row.CategoriaID, row.FK_EstadosID)
                    }
                  />
                </TableCell>
                <TableCell align="right">{row.Fecha_Creacion}</TableCell>
                <TableCell align="right">
                  <ButtonGroup
                    variant="contained"
                    aria-label="Basic button group"
                  >
                    <Button startIcon={<Delete />}></Button>
                  </ButtonGroup>
                  <Button
                    startIcon={<ModeEdit />}
                    onClick={() => handleClickEdit(row.CategoriaID)}
                  ></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <tfoot>
            <tr>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={categories.length}
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
        setCategories={setCategories}
      />
    </>
  );
}
