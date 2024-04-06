import React, { useState, useEffect } from 'react';
import {  DetailsList, DetailsListLayoutMode, PrimaryButton, SelectionMode } from '@fluentui/react';
import { taskService } from '../services/taskService';
import { useBoolean } from '@fluentui/react-hooks';
import { ModalAgregar } from '../components/ModalAgregar';


const Tabla = () => {
    const [tasks, setTasks] = useState([]);
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);

    //Consulta a la bd
    function listar() {
        taskService.listarTareas().then((res) => {
            if(res.status == 200) {
                setTasks(res.data);
        }})
        .catch((e) => {
              console.error("Error en la solicitud:", e.message);        
          });
    }
    
    const _tabla = () => {
        listar();
    }

    useEffect(() => {
        listar()
    },[])

    const columns = [
        { key: 'id', name: 'ID', fieldName: 'id', minWidth: 50, maxWidth: 100 },
        { key: 'title', name: 'Title', fieldName: 'title', minWidth: 100, maxWidth: 200 },
        { key: 'description', name: 'Description', fieldName: 'description', minWidth: 200, maxWidth: 400 },
    ];


    return (
        <div>
            <h2>Lista de tareas</h2>
            <PrimaryButton text="Agregar tarea" onClick={openPanel}></PrimaryButton>
            <DetailsList
                items={tasks}
                columns={columns}
                selectionMode={SelectionMode.none}
                layoutMode={DetailsListLayoutMode.fixedColumns}
            />

            <ModalAgregar
                isOpen={isOpen}
                onDismiss={dismissPanel}
                reload={_tabla}
            />
        </div>
    );
};

export default Tabla;
