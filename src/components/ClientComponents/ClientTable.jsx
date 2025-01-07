import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ButtonGroup, Button, Chip, TablePagination } from "@mui/material";
import { Delete, ModeEdit } from "@mui/icons-material";

export default function Clients({ clients, desactivarUsuario, onConfirm }) {
  const [clienteID, setClienteID] = React.useState(0);
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);

  const handleConfirm = () => {
    onConfirm(clienteID);
    setOpen(false);
  };
  const handleOpen = (ID) => {
    setClienteID(ID);
    setOpen(true);
  };
  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }
  return (
    <>
      <TableContainer sx={{ mb: 4 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Rol</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Dirección</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Teléfono</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.slice(pg * rpg, pg * rpg + rpg).map((row) => (
              <TableRow
                key={row.UsuarioID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.Nombre}
                </TableCell>
                <TableCell align="right">{row.Nombre_Rol}</TableCell>
                <TableCell align="right">
                  <Chip
                    label={row.Nombre_Estado}
                    onClick={() =>
                      desactivarUsuario(row.UsuarioID, row.FK_EstadoID)
                    }
                  />
                </TableCell>
                <TableCell align="right">{row.Direccion}</TableCell>
                <TableCell align="right">{row.Correo}</TableCell>
                <TableCell align="right">{row.Telefono}</TableCell>
                <TableCell align="right">
                  <ButtonGroup
                    variant="contained"
                    aria-label="Basic button group"
                  >
                    <Button
                      startIcon={<Delete />}
                      onClick={() => handleOpen(row.UsuarioID)}
                    ></Button>
                    <Button startIcon={<ModeEdit />}></Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <tfoot>
            <tr>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                //component="div"
                count={clients.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </tr>
          </tfoot>
        </Table>
      </TableContainer>
    </>
  );
}
