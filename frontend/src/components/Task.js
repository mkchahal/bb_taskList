export const Task = ({ task }) => {
  const { title, content, date } = task;
  return (
    <tr>
      <td>{title}</td>
      <td>{content}</td>
      <td>{date.slice(0, 10)}</td>
      <td>
        <button>Edit</button>
      </td>
      <td>
        <button>Delete</button>
      </td>
    </tr>
  );
};
