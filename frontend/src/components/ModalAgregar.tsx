import { DefaultButton, PrimaryButton, Spinner, SpinnerSize, TextField, Toggle, useFocusRects } from '@fluentui/react';
import { Panel } from '@fluentui/react/lib/Panel';
import React, {  useEffect, useState } from 'react';
import { ICrearTarea } from '../interface/ICrearTarea';
import { taskService } from '../services/taskService';
const buttonStyles = { root: { marginRight: 8 } };

export const ModalAgregar = (props: any) => {
    const [hiddenSpinner, setHiddenSpinner] = useState(false);
    const [contenedor, setContenedor] = useState(false);
    const [formFill, setFormFill] = useState(true);
    const [dataCrearTarea, setDataCrearTarea] = useState<ICrearTarea>({
        title: "",
        description: "",
        completed:false
    });

    useEffect(() => {
        validarForm();
      }, [dataCrearTarea]);

    const validarForm = () => {
        if (dataCrearTarea == null) setFormFill(true);
        if (dataCrearTarea !== null) {
          if (
            dataCrearTarea.title != "" &&
            dataCrearTarea.description != ""
          ) {
            setFormFill(false);
          } else {
            setFormFill(true);
          }
        }
      };
    

    //Consulta a la bd
    function crear() {
        const newValidacion: ICrearTarea = { 
            ...dataCrearTarea, 
        };
        setHiddenSpinner(true);
        setContenedor(true);
        taskService.crearTareas(newValidacion)
            .then((res) => {
                if(res.status === 201) {
                    props.onDismiss();
                    props.reload();
                    setContenedor(false)
                    setHiddenSpinner(false);
                    cleanInputs()
                }
            })
            .catch((e) => {
                console.error("Error en la solicitud:", e.message);        
            });
    }

    function cleanInputs() {
        setDataCrearTarea({
            title:"",
            description:"",
            completed:false
        })
    }

    const _onChangeTextField = (nombreTextField: string | undefined, evento: any, nuevoValor: string | undefined) => {
        if (evento !== undefined) {
            if (nuevoValor !== undefined) {
                switch (nombreTextField) {
                    case "title":
                        setDataCrearTarea({
                            ...dataCrearTarea,
                            title: nuevoValor,
                        });
                        break;

                    case "description":
                        setDataCrearTarea({
                            ...dataCrearTarea,
                            description: nuevoValor,
                        });
                        break;
                }
            }
        }
    };

    const cuerpo = React.useCallback(
        () => (
            <div>
                <PrimaryButton disabled={formFill} onClick={crear} styles={buttonStyles}>
                    Guardar
                </PrimaryButton>
                <DefaultButton onClick={props.onDismiss}>Cancel</DefaultButton>
            </div>
        ),
        [props.dismissPanel, dataCrearTarea],
    );

    return (
        <div>
            <Panel
                headerText="Agregar nueva tarea"
                isOpen={props.isOpen}
                onDismiss={props.onDismiss}
                isLightDismiss={true}
                isHiddenOnDismiss={true}
                closeButtonAriaLabel="Close"
                onRenderFooterContent={cuerpo}
                isFooterAtBottom={true}
            >
                <br />

                <div hidden={!hiddenSpinner}>
                <Spinner size={SpinnerSize.large} />
                </div>

                <div hidden={contenedor}>
                <TextField
                    label="Ingresa el título"
                    onChange={(e, o) => _onChangeTextField("title", e, o)}
                    value={dataCrearTarea?.title}
                />
                <TextField
                    label="Ingresa la descripción"
                    onChange={(e, o) => _onChangeTextField("description", e, o)}
                    value={dataCrearTarea?.description}
                />
                </div>
                
            </Panel>
        </div>
    );
};
