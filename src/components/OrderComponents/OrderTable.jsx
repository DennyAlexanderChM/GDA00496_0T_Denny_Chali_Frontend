import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ButtonGroup, Button, Chip, TablePagination } from "@mui/material";
import { Cancel, ModeEdit, Check } from "@mui/icons-material";

export default function Order({ ordersDetails, activarPedido }) {
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);
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
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Dirección</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Teléfono</TableCell>
              <TableCell align="right">Fecha</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersDetails.slice(pg * rpg, pg * rpg + rpg).map((row) => (
              <TableRow
                key={row.OrdenID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.Nombre}
                </TableCell>
                <TableCell align="right">
                  <Chip
                    label={row.FK_EstadoID === 3 ? "Confirmado" : "Finzalizado"}
                    onClick={() => console.log("hello")}
                  />
                </TableCell>
                <TableCell align="right">Q.{row.Total_Orden}</TableCell>
                <TableCell align="right">{row.Direccion_Envio}</TableCell>
                <TableCell align="right">{row.Correo}</TableCell>
                <TableCell align="right">{row.Telefono}</TableCell>
                <TableCell align="right">{row.Fecha_Entrega}</TableCell>
                <TableCell align="right">
                  <ButtonGroup
                    variant="contained"
                    aria-label="Basic button group"
                  >
                    <Button
                      onClick={() => activarPedido(row.OrdenID, 5)}
                      startIcon={<Cancel />}
                    ></Button>
                    <Button startIcon={<ModeEdit />}></Button>
                    <Button
                      onClick={() => activarPedido(row.OrdenID, 4)}
                      startIcon={<Check />}
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
                //component="div"
                count={ordersDetails.length}
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
