<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NotaTareasEstudiante;
use App\Models\Estudiante;
use App\Models\Sprint;

class NotaTareasEstudianteController extends Controller
{
    /**
     * Muestra una lista de las notas de tareas de estudiantes.
     */
    public function index()
    {
        $notas = NotaTareasEstudiante::with(['estudiante', 'sprint'])->get();
        return response()->json($notas);
    }

    /**
     * Muestra el formulario para crear una nueva nota de tarea de estudiante.
     */
    public function create()
    {
        // Retornar datos necesarios, como estudiantes y sprints
        $estudiantes = Estudiante::all();
        $sprints = Sprint::all();
        return response()->json(compact('estudiantes', 'sprints'));
    }

    /**
     * Guarda una nueva nota de tarea de estudiante en la base de datos.
     */
    public function store(Request $request)
    {
        $request->validate([
            'estudiante_idEstudiante' => 'required|exists:estudiante,idEstudiante',
            'sprint_idSprint' => 'required|exists:sprint,idSprint',
            'comentario' => 'required|string|max:200',
        ]);

        $nota = NotaTareasEstudiante::create($request->all());
        return response()->json($nota, 201);
    }

    /**
     * Muestra una nota específica de tarea de estudiante.
     */
    public function show($id)
    {
        $nota = NotaTareasEstudiante::with(['estudiante', 'sprint'])->findOrFail($id);
        return response()->json($nota);
    }

    /**
     * Muestra el formulario para editar una nota de tarea de estudiante.
     */
    public function edit($id)
    {
        $nota = NotaTareasEstudiante::findOrFail($id);
        $estudiantes = Estudiante::all();
        $sprints = Sprint::all();
        return response()->json(compact('nota', 'estudiantes', 'sprints'));
    }

    /**
     * Actualiza una nota específica en la base de datos.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'estudiante_idEstudiante' => 'required|exists:estudiante,idEstudiante',
            'sprint_idSprint' => 'required|exists:sprint,idSprint',
            'comentario' => 'required|string|max:200',
        ]);

        $nota = NotaTareasEstudiante::findOrFail($id);
        $nota->update($request->all());
        return response()->json($nota);
    }

    /**
     * Elimina una nota de tarea de estudiante.
     */
    public function destroy($id)
    {
        $nota = NotaTareasEstudiante::findOrFail($id);
        $nota->delete();
        return response()->json(['message' => 'Nota eliminada con éxito']);
    }
}
