require('dotenv').config();

const helperCompararDetails = (detailreq, detailDb) => {
    let deatilNew = {};

    deatilNew.id = deatilNew.id;

    deatilNew.pisos = detailreq.pisos != detailDb.pisos ? detailreq.pisos : detailDb.pisos;
    deatilNew.habitaciones = detailreq.habitaciones != detailDb.habitaciones ? detailreq.habitaciones: detailDb.habitaciones;
    deatilNew.banosCompletos = detailreq.banosCompletos != detailDb.banosCompletos ? detailreq.banosCompletos: detailDb.banosCompletos;
    deatilNew.banosMedios = detailreq.banosMedios != detailDb.banosMedios ? detailreq.banosMedios: detailDb.banosMedios;
    deatilNew.cocina = detailreq.cocina != detailDb.cocina ? detailreq.cocina: detailDb.cocina;
    deatilNew.patio = detailreq.patio != detailDb.patio ? detailreq.patio: detailDb.patio;
    deatilNew.balcon = detailreq.balcon != detailDb.balcon ? detailreq.balcon: detailDb.balcon;
    deatilNew.estacionamiento = detailreq.estacionamiento != detailDb.estacionamiento ? detailreq.estacionamiento: detailDb.estacionamiento;
    detaideatilNewlDb.elevador = detailreq.elevador != detailDb.elevador ? detailreq.elevador: detailDb.elevador;
    deatilNew.piscina = detailreq.piscina != detailDb.piscina ? detailreq.piscina: detailDb.piscina;
    deatilNew.areasPublicas = detailreq.areasPublicas != detailDb.areasPublicas ? detailreq.areasPublicas: detailDb.areasPublicas;
    deatilNew.fumar = detailreq.fumar != detailDb.fumar ? detailreq.fumar: detailDb.fumar;
    deatilNew.mascotas = detailreq.mascotas != detailDb.mascotas ? detailreq.mascotas: detailDb.mascotas;
    deatilNew.reuniones = detailreq.reuniones != detailDb.reuniones ? detailreq.reuniones: detailDb.reuniones;
    deatilNew.descripcion = detailreq.descripcion != detailDb.descripcion ? detailreq.descripcion: detailDb.descripcion;
    deatilNew.indicaciones = detailreq.indicaciones != detailDb.indicaciones ? detailreq.indicaciones: detailDb.indicaciones;
    deatilNew.lavado = detailreq.lavado != detailDb.lavado ? detailreq.lavado: detailDb.lavado;
    deatilNew.status = detailreq.status != detailDb.status ? detailreq.status: detailDb.status;

    return deatilNew;
}

export {helperCompararDetails}
