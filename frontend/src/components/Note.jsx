import { TableCell, TableRow } from "@mui/material";

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";
  return (
    <TableRow key={note.id}>
      <TableCell>
        <a href={`/notes/${note.id}`}>{note.content}</a>
      </TableCell>
      <TableCell>{note.user.name}</TableCell>
      <TableCell>
        {toggleImportance ? (
          <button onClick={toggleImportance}>{label}</button>
        ) : (
          ""
        )}
      </TableCell>
    </TableRow>
  );
};

export default Note;
