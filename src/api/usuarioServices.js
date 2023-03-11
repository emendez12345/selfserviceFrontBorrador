import instance from "./services";

const getUser = async () => {
  try {
    const resp = await instance.get("/usuarios/", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    return resp.data;
  } catch (error) {
    return error.response.statusText;
  }
};

const actualizarUsuarios = async (req) => {
  try {
    const resp = await instance.put(`/usuarios`,
      {
        id_usuario: req.id_usuario,
        nombre: req.nombre,
        telefono: req.telefono,
        estado: req.estado,
        password: req.password,
        password_confirmation: req.password_confirmation,
      },
    );
    return resp.data;

  } catch (error) {
    return error.response.statusText;
  }
};


const createUser = async (req) => {
  try {
    const resp = await instance.post("/usuarios", {

      nombre: req.nombre,
      telefono: req.telefono,
      estado: req.estado,
      password: req.password,
      password_confirmation: req.password_confirmation,
    });

    return resp.data;

  } catch (error) {
    return error.response.statusText;
  }
};






export { getUser, createUser, actualizarUsuarios};