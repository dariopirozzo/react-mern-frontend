import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CreateNote, GetNotes, updateNote, deleteNote } from "../service/event";
import axios from "axios";

const Home = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null); // Guarda el ID de la nota en edición

  const token = localStorage.getItem("token"); // Obtén el token desde localStorage o contexto

  // Función para obtener notas del backend
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const data = await GetNotes(token);
      setEvents(data.msg);
    } catch (error) {
      console.error("Error obteniendo notas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Función para guardar o actualizar nota
  const handleSave = async () => {
    if (!title.trim()) return;
    setSaving(true);

    try {
      if (editing) {
        await updateNote(title, notes, startDate.getTime(), endDate.getTime(),editing);
      } else {
        await CreateNote(title, notes, startDate.getTime(), endDate.getTime());
      }
      
      setTitle("");
      setNotes("");
      setEditing(null);
      fetchNotes(); 
    } catch (error) {
      console.error("Error guardando la nota:", error);
    } finally {
      setSaving(false);
    }
  };

  // Función para cargar datos en el modal para edición
  const handleEdit = (event) => {
    setTitle(event.title);
    setNotes(event.notes);
    setStartDate(new Date(event.start));
    setEndDate(new Date(event.end));
    setEditing(event._id);
  };

  // Función para eliminar nota
  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar esta nota?");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await deleteNote(eventId);
      fetchNotes(); // Recargar lista después de eliminar
    } catch (error) {
      console.error("Error eliminando la nota:", error);
    } finally {
      setLoading(false);
    }
  };
console.log(events)
  return (
    <>
      <Navbar />

      {/* Botón para abrir modal */}
      <button
        type="button"
        className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center ms-3"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ width: "60px", height: "60px" }}
      >
        <i className="fas fa-plus"></i>
      </button>

      {/* Modal para crear/editar nota */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {editing ? "Editar Nota" : "Agregar Nueva Nota"}
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">
              <div>
                <div className="form-group mb-2 d-flex flex-column">
                  <label>Inicio</label>
                  <DatePicker selected={startDate} onChange={setStartDate} />
                </div>
                <div className="form-group mb-2 d-flex flex-column">
                  <label>Fin</label>
                  <DatePicker selected={endDate} onChange={setEndDate} />
                </div>
                <div className="form-group mb-2">
                  <label>Título</label>
                  <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group mb-2">
                  <label>Notas</label>
                  <textarea className="form-control" value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={handleSave} 
                disabled={saving} 
                data-bs-dismiss="modal"
              >
                {saving ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  editing ? "Actualizar Nota" : "Guardar Nota"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Spinner mientras se cargan las notas */}
      {loading ? (
        <div className="text-center mt-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
          <div className="d-flex flex-wrap gap-3 mt-4 p-3">
          {events.map((event) => (
            <div key={event.id} className="card p-3 shadow" style={{ width: "250px" }}>
              <h5>{event.title}</h5>
              <p>{event.notes}</p>
              <p><strong>Inicio:</strong> {new Date(event.start).toLocaleDateString()}</p>
              <p><strong>Fin:</strong> {new Date(event.end).toLocaleDateString()}</p>
              <div className="d-flex justify-content-between">
                <button className="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleEdit(event)}>
                  Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(event._id)}>Eliminar</button>
              </div>
            </div>
          ))}
          </div>
      )}
    </>
  );
};

export default Home;
