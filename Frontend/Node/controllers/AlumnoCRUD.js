import { AlumnoModel } from "../models/UserModelTemp.js";
import AulaModel from "../models/AulaModel.js";

export const getAllAlumnos = async (req, res) => {
    try {
        const alumnos = await AlumnoModel.findAll();
        res.json(alumnos);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error en el servidor',
            error: error.message
        });
    }
}

export const getOneAlumno = async (req, res) => {
    try {
        const { id_alumno } = req.params;
        const alumno = await AlumnoModel.findOne({
            where: {
                id_alumno
            }
        });
        
        if (alumno) {
            res.json(alumno);
        } else {
            res.status(404).json({
                message: 'Alumno no encontrado'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error en el servidor',
            error: error.message
        });
    }
};

export const updateAlumno = async (req, res) => {
    try {
        const { id_alumno } = req.params;
        const { id_aula } = req.body;

        const alumno = await AlumnoModel.findOne({
            where: { id_alumno }
        });

        if (!alumno) {
            return res.status(404).json({
                message: 'Alumno no encontrado'
            });
        }

        const aula = await AulaModel.findByPk(id_aula);
        if (!aula) {
            return res.status(404).json({ message: 'aula no encontrada' });
        }

        const updatedAlumno = await alumno.update(req.body);

        res.status(200).json({
            message: 'Alumno actualizado exitosamente',
            data: updatedAlumno
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error en el servidor',
            error: error.message
        });
    }
};


export const deleteAlumno = async (req, res) => {
    try {
        const { id_alumno } = req.params;

        const alumno = await AlumnoModel.findOne({
            where: { id_alumno }
        });

        if (!alumno) {
            return res.status(404).json({
                message: 'Alumno no encontrado'
            });
        }

        await alumno.destroy();

        res.status(200).json({
            message: 'Alumno eliminado exitosamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error en el servidor',
            error: error.message
        });
    }
};


export const createAlumno = async (req, res) => {
    try {
        const {
            id_alumno,
            tipo_id,
            prim_nom,
            seg_nom,
            prim_apell,
            seg_apell,
            genero,
            fecha_nacimiento,
            estrato,
            celular,
            edad,
            direccion,
            correo,
            id_aula
        } = req.body;

        if (!tipo_id || !prim_nom || !prim_apell || !seg_apell || !genero || !fecha_nacimiento || !id_aula) {
            return res.status(400).json({
                message: 'Todos los campos obligatorios deben ser proporcionados',
                error: error.message
            });
        }

        const aulaExists = await AulaModel.findOne({ where: { id_aula: id_aula } });
        const institucionExists = await InstitucionModel.findOne({ where: { cod_DANE } });

        if (!aulaExists) {
            return res.status(400).json({
                message: 'El aula especificada no existe',
                error: error.message});
        }

        if (!institucionExists) {
            return res.status(400).json({
                message: 'La institución especificada no existe',
                error: error.message
            });
        }
        //Se crea el alumno en la base de datos
        const newAlumno = await AlumnoModel.create({
            id_alumno,
            tipo_id,
            prim_nom,
            seg_nom,
            prim_apell,
            seg_apell,
            genero,
            fecha_nacimiento,
            estrato,
            celular,
            edad,
            direccion,
            correo,
            id_aula,
            cod_DANE
        });

        // Responder con un mensaje de éxito y los datos del nuevo alumno
        res.status(201).json({
            message: 'Alumno creado exitosamente',
            data: newAlumno
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error en el servidor',
            error: error.message
        });
    }
};
