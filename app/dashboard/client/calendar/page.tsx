import { Calendar } from "../../components/calendar/calendar";

export default function Page() {
  return (
    <main className="flex flex-col flex-grow">
      <div className="flex-grow overflow-hidden">
        <Calendar />
      </div>
    </main>
  )
}