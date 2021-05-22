import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

const data = [
{id: 1, nombre: "Oscar", cedula: 55555, telefono: "44444", mail: "asdasd" },
{id: 2, nombre: "Oscar", cedula: 55555, telefono: "44444", mail: "asdasd" },
{id: 3, nombre: "Oscar", cedula: 55555, telefono: "44444", mail: "asdasd" },
{id: 4, nombre: "Oscar", cedula: 55555, telefono: "44444", mail: "asdasd" },

];
class App extends React.Component{
  state={
    data: data,
    form:{
      id:'',
      nombre:'',
      cedula:'',
      telefono:'',
      mail:''
    }, //mapeo de data
    modalInsertar:false,
    modalEditar:false  //ocultar o mostrar modals

  };

  handleChange=e=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });  //al cambio
    
  }
  //mostrar y oculatar modals
  mostrarModalInsertar=()=>{
      this.setState({modalInsertar:true});
  }
  ocultarModalInsertar=()=>{
    this.setState({modalInsertar:false});
  }
  mostrarModalEditar=(registro)=>{
    this.setState({modalEditar:true, form: registro});
}
ocultarModalEditar=()=>{
  this.setState({modalEditar:false});
}
//mostrar y oculatar modals
  insertar=()=>{
    var valorNuevo={...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista=this.state.data;
    lista.push(valorNuevo);
    this.setState({data: lista, modalInsertar: false});
  }//insertar dato

  editar=(dato)=>{
    var contador=0;
    var lista=this.state.data;
    lista.map((registro)=>{
      if(dato.id==registro.id){
        lista[contador].nombre=dato.nombre;
        lista[contador].cedula=dato.cedula;
        lista[contador].telefono=dato.telefono;
        lista[contador].mail=dato.mail;
        
      }
      contador++;

    });
    this.setState({data: lista, modalEditar: false});
  } //editar
  eliminar=(dato)=>{
    var opcion=window.confirm("Eliminar registro"+ dato.id);
    if(opcion){
      var contador=0;
      var lista = this.state.data;
      lista.map((registro)=>{
        if(registro.id==dato.id){
          lista.splice(contador, 1);
        }
        contador++;
      });
      this.setState({data:lista});


    }

  } // eliminar

    render(){
      return(
          <>
          <Container>
          
          <br/>
          <Button color="dark" onClick={()=>this.mostrarModalInsertar()}> Insertar Usuario </Button>
          <br/><br/>

          <Table>
              <thead><tr><th>Id</th>
              <th>Nombre</th>
              <th>Cedula</th>
              <th>Telefono</th>
              <th>Mail</th>
              <th>Opciones</th>
              </tr></thead>
              <tbody>
                {this.state.data.map((elemento)=>
                <tr>
                  <td>{elemento.id}</td>
                  <td>{elemento.nombre}</td>
                  <td>{elemento.cedula}</td>
                  <td>{elemento.telefono}</td>
                  <td>{elemento.mail}</td>
                  <td><Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>{" "}
                  <Button color="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button></td>
                  
                </tr>
                )}
              </tbody>

          </Table> 




        </Container>
      
      <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar registro</h3>
            </div>
          </ModalHeader>
          <ModalBody>
                <FormGroup>
                  <label>Id:</label>
                  <input className="form-control" readOnly type="text" value={this.state.data.length+1}></input>
                </FormGroup>
                <FormGroup>
                  <label>Nombre:</label>
                  <input className="form-control" name="nombre" type="text" onChange={this.handleChange}></input>
                </FormGroup>
                <FormGroup>
                  <label>Cedula:</label>
                  <input className="form-control" name="cedula" type="text" onChange={this.handleChange}></input>
                </FormGroup>
                <FormGroup>
                  <label>Telefono:</label>
                  <input className="form-control" name="telefono" type="text" onChange={this.handleChange}></input>
                </FormGroup>
                <FormGroup>
                  <label>Mail:</label>
                  <input className="form-control" name="mail" type="text" onChange={this.handleChange}></input>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={()=>this.insertar()}>Insertar</Button>
              <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
            </ModalFooter>
            </Modal>




        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div>
              <h3>Editar registro</h3>
            </div>
          </ModalHeader>
          <ModalBody>
                <FormGroup>
                  <label>Id:</label>
                  <input className="form-control" readOnly type="text" value={this.state.form.id}></input>
                </FormGroup>
                <FormGroup>
                  <label>Nombre:</label>
                  <input className="form-control" name="nombre" type="text" onChange={this.handleChange} value={this.state.form.nombre}></input>
                </FormGroup>
                <FormGroup>
                  <label>Cedula:</label>
                  <input className="form-control" name="cedula" type="text" onChange={this.handleChange} value={this.state.form.cedula}></input>
                </FormGroup>
                <FormGroup>
                  <label>Telefono:</label>
                  <input className="form-control" name="telefono" type="text" onChange={this.handleChange} value={this.state.form.telefono}></input>
                </FormGroup>
                <FormGroup>
                  <label>Mail:</label>
                  <input className="form-control" name="mail" type="text" onChange={this.handleChange} value={this.state.form.mail}></input>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={()=>this.editar(this.state.form)}>Editar</Button>
              <Button color="danger" onClick={()=>this.ocultarModalEditar()} >Cancelar</Button>
            </ModalFooter>

      </Modal>

      
      
      </>)
    }

}










export default App;
