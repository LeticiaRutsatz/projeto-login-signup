import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import SearchIcon from "@mui/icons-material/Search";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import {
  deleteRecadoRequest,
  Errand,
  getErrandRequest,
  updateRecadoRequest,
} from "../../store/modules/typeStore";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearInputDesc,
  editarRecadoDes,
} from "../../store/modules/userLogged/descricaoSlice";
import {
  clearInputDet,
  editarRecadoDet,
} from "../../store/modules/userLogged/detailSlice";
import {
  changeBooleanFalse,
  changeBooleanTrue,
} from "../../store/modules/button/buttonEnviar";
import {
  Alert,
  Checkbox,
  IconButton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import Typography from "@mui/material/Typography";
import "../../config/style/index.css";
import { CssTextField } from "../Inputs/Textfield";
import {
  buscarRecados,
  deleteRecado,
  getRecados,
  updateRecado,
} from "../../store/modules/errands/errandsSlice";

interface FormProps {
  list: Errand[];
}

function TableErrands({ list }: FormProps) {
  const userLogged = useAppSelector((state) => state.userLogged);
  const recadosSlicebuscar = useAppSelector(buscarRecados);
  const [inputId, setInputId] = useState<any>("");
  const [inputName, setInputName] = useState("");
  const inputDesc = useAppSelector((state) => state.inputDesc);
  const inputDetail = useAppSelector((state) => state.inputDetail);
  const [changeIcon, setChangeIcon] = useState(Math.random());
  const [checked, setChecked] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);
  const { loading, message, success } = useAppSelector(
    (state) => state.errands
  );
  const [messageError, setMessageError] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (checked && userLogged.id) {
      const getErrandsUser: getErrandRequest = {
        id: userLogged!.id,
        idRecado: "",
        name: "",
      };
      dispatch(getRecados(getErrandsUser));
    }
  }, [checked, dispatch, userLogged]);

  useEffect(() => {
    setOpenAlert(true);
  }, [success]);

  function mudaInputId(event: any) {
    setInputId(event);
  }

  function mudaInputName(event: string) {
    setInputName(event);
  }

  function handleEdit(dado: Errand) {
    dispatch(editarRecadoDes(dado));
    dispatch(editarRecadoDet(dado));
    setChangeIcon(dado.changeIcon);

    dispatch(changeBooleanFalse());
  }

  function handleAtt(dado: Errand) {
    const newRecado: updateRecadoRequest = {
      id: userLogged!.id,
      idRecado: dado.id,
      newRecado: {
        name: inputDesc,
        detail: inputDetail,
        filed: false,
      },
    };

    dispatch(updateRecado(newRecado));

    clearInput();
    setChangeIcon(Math.random());
    dispatch(changeBooleanTrue());
  }

  function handleDelete(dado: Errand) {
    const dadosForDelete: deleteRecadoRequest = {
      id: userLogged!.id,
      idRecado: dado.id,
    };

    dispatch(deleteRecado(dadosForDelete));
  }

  function handleToFile(dado: Errand) {
    const recadoArquivado: updateRecadoRequest = {
      id: userLogged!.id,
      idRecado: dado.id,
      newRecado: {
        name: dado.name,
        detail: dado.detail,
        filed: true,
      },
    };
    dispatch(updateRecado(recadoArquivado));
  }

  function handleToFilter() {
    let existIdErrand = list[inputId - 1];

    if (existIdErrand === undefined) {
      setMessageError("ID não encontrado, digite novamente");
      setOpenAlertError(true);
      return;
    }

    const idErrandTrue = existIdErrand.id;

    const errandToFilter: getErrandRequest = {
      id: userLogged!.id,
      idRecado: idErrandTrue,
      name: inputName,
    };
    dispatch(getRecados(errandToFilter));

    setInputName("");
    setInputId("");
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setChecked(event.target.checked);
  }

  const handleCloseSuccess = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleCloseError = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlertError(false);
  };

  function clearInput() {
    dispatch(clearInputDet());
    dispatch(clearInputDesc());
  }

  return (
    <>
      <Grid container padding={4}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            marginTop: { md: "2rem" },
            color: "#30c88c",
            margintop: "10rem",
          }}
        >
          <Typography variant="overline" className="standard-number">
            Filtrar:
          </Typography>
          <CssTextField
            id="standard-number"
            label="ID"
            type="number"
            size="small"
            variant="standard"
            required
            className="input-table"
            value={inputId}
            onChange={(ev) => mudaInputId(ev.target.value)}
            sx={{
              marginLeft: "1rem",
              marginRight: "2rem",
              marginTop: "-1rem",
            }}
          />
          <CssTextField
            id="standard-search"
            label="Nome"
            type="search"
            size="small"
            required
            variant="standard"
            value={inputName}
            onChange={(ev) => mudaInputName(ev.target.value)}
            sx={{ marginTop: "-1rem" }}
          />
          <IconButton
            aria-label="filter"
            onClick={handleToFilter}
            disabled={inputName === "" || inputId === ""}
          >
            <SearchIcon sx={{ color: "#30c88c" }} />
          </IconButton>
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", color: "#fff" }}>
          <Checkbox
            sx={{
              color: "#30c88c",
              "&.Mui-checked": {
                color: "#30c88c",
              },
            }}
            name="ckeckbox"
            onChange={handleChange}
            disabled={inputName !== "" && inputId !== 0}
          />
          <p className="p-tableErrands">Mostrar todos recados</p>
        </Grid>

        <Grid xs={12}>
          <TableContainer
            component={Paper}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#30c88c" }}>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Detalhamento</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((dado: Errand, index: number) => (
                  <TableRow
                    key={dado.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      backgroundColor: "#83ecc2",
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{dado.name}</TableCell>
                    <TableCell align="center">{dado.detail}</TableCell>
                    <TableCell align="center">
                      <Grid
                        container
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Grid item xs={12} sm={2}>
                          <IconButton
                            sx={{
                              fontSize: "10px",
                              margin: "5px",
                              color: "#148759",
                            }}
                            onClick={() =>
                              dado.changeIcon === changeIcon
                                ? handleAtt(dado)
                                : handleEdit(dado)
                            }
                          >
                            {" "}
                            {dado.changeIcon == changeIcon ? (
                              <UpgradeIcon />
                            ) : (
                              <EditIcon />
                            )}{" "}
                          </IconButton>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <IconButton
                            color="primary"
                            sx={{ fontSize: "1rem", color: "#148759" }}
                            onClick={() => handleToFile(dado)}
                          >
                            <Inventory2Icon />
                          </IconButton>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <IconButton
                            color="primary"
                            sx={{
                              fontSize: "10px",
                              margin: "5px",
                              color: "#148759",
                            }}
                            onClick={() => handleDelete(dado)}
                          >
                            <DeleteIcon />{" "}
                          </IconButton>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* ALERTS */}
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleCloseSuccess}
          anchorOrigin={{ horizontal: "left", vertical: "top" }}
        >
          <Alert
            onClose={handleCloseSuccess}
            severity={success ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>

        <Snackbar
          open={openAlertError}
          autoHideDuration={6000}
          onClose={handleCloseError}
          anchorOrigin={{ horizontal: "left", vertical: "top" }}
        >
          <Alert
            onClose={handleCloseError}
            severity="error"
            sx={{ width: "100%" }}
          >
            {messageError}
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
}

export { TableErrands };
