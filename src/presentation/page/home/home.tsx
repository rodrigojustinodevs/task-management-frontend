import { AppBar } from "@presentation/components/app-bar"
import { Button } from "@presentation/components/button"
import { Input } from "@presentation/components/form/input"
import {
    Table,
    TableActions,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@presentation/components/table"
import { TaskDialog } from "@presentation/components/task-dialog"
import { TaskStatus } from "@presentation/components/task-status"
import {
    List,
    LoaderCircleIcon,
    Pencil,
    Trash2
} from "lucide-react"
import { memo } from "react"
import { useHomePage } from "./use-home-page"
import { DropdownMenuItem, DropdownMenuShortcut } from "@presentation/components/dropdown-menu"

const Home = memo(() => {
    const {
        loading,
        tasks,
        register,
        getTasksByFilters
    } = useHomePage()

    return <div className="flex flex-col w-full h-full justify-center">
        <div className="flex items-center justify-center">
            <div className="w-[85dvw] pt-12">
                <AppBar />
            </div>
        </div>
        <div className="flex items-center justify-center">
            <div className="w-[85dvw] flex flex-col gap-1">
                <h5 className="text-xs md:text-base">Here's a list of your tasks</h5>
            </div>
        </div>
        <div className="w-dvw h-full overflow-y-auto">
            <div className="flex flex-col items-center pt-5 pb-6">
                <div className="w-[85dvw] flex flex-col gap-6 rounded-lg p-4 overflow-hidden bg-white drop-shadow-2xl">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                            <Input {...register("title")} className="w-100 md:w-80" placeholder="filter tasks..." />
                            <div className="w-full flex justify-end">
                                <TaskDialog.Create refresh={getTasksByFilters} />
                            </div>
                        </div>
                        <div className="border rounded-lg">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="md:w-72">Identifier</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="w-48">Status</TableHead>
                                        <TableHead className="w-32" />
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {!loading && tasks.flatMap((task, index) =>
                                        <TableRow key={index}>
                                            <TableCell className="w-fit md:w-72">{task.identifier}</TableCell>
                                            <TableCell className="truncate max-w-36">{task.title}</TableCell>
                                            <TableCell className="truncate max-w-36">{task.description}</TableCell>
                                            <TableCell><TaskStatus type={task.status} /></TableCell>
                                            <TableCell>
                                                <TableActions>
                                                    <TaskDialog.Update
                                                        key={`edit-dialog-${index}`}
                                                        task={task}
                                                        refresh={getTasksByFilters}
                                                        actionButton={
                                                            <Button variant="ghost" className="w-full flex p-[0.625rem_0.5rem] items-center justify-between font-normal [&_div]:w-full [&_div]:p-0">
                                                                Edit
                                                                <DropdownMenuShortcut><Pencil className="w-4 h-4" /></DropdownMenuShortcut>
                                                            </Button>
                                                        }
                                                    />
                                                    <DropdownMenuItem key={`table-action-${index}`} className="hover:cursor-pointer">
                                                        Remove
                                                        <DropdownMenuShortcut><Trash2 className="w-4 h-4 text-red-600" /></DropdownMenuShortcut>
                                                    </DropdownMenuItem>
                                                </TableActions>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            {!loading && !tasks.length && (
                                <div className="w-full h-32 flex flex-row gap-4 items-center justify-center">
                                    <List className="h-8 w-8 text-gray-600" />
                                    <p className="text-sm">No tasks found</p>
                                </div>
                            )}
                            {loading && <div className="w-full h-32 flex items-center justify-center">
                                <LoaderCircleIcon className="animate-spin h-12 w-12 text-gray-600" />
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
})

export { Home }
