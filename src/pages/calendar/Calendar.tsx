import { Badge, Calendar } from "antd";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../utils/hooks/useFetch";
import { useClient } from "../../context/client";
import { Todo } from "../../types/entities/Todo";
import { Loader } from "../../components/Loader";
import { FORMAT } from "../../utils/utils";

export const CalendarPage = () => {
  const client = useClient();
  const [value, setValue] = useState(dayjs());
  const [todos, setTodos] = useState<Todo[]>([]);
  const navigate = useNavigate();

  const { loading } = useFetch(
    () => client.todos.getByMonth(value.format("YYYY-MM")),
    (res) => setTodos(res),
    undefined,
    [value]
  );

  const hasTodos = useCallback(
    (date: dayjs.Dayjs) => {
      return todos.some((todo) => date.format(FORMAT) === todo.day);
    },
    [todos]
  );

  const onChange = useCallback(
    (date: dayjs.Dayjs) => {
      const isClickedOnDay =
        value.format(FORMAT).split("-")[2] !==
          date.format(FORMAT).split("-")[2] ||
        date.format(FORMAT) === dayjs().format(FORMAT);
      if (isClickedOnDay) {
        navigate(`/todos/${date.format(FORMAT)}`);
      } else {
        setValue(date);
      }
    },
    [navigate, value]
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <Calendar
      mode={"month"}
      cellRender={(date) =>
        hasTodos(date) ? <Badge color="#ff782a" /> : undefined
      }
      value={value}
      onSelect={onChange}
    />
  );
};
