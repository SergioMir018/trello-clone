import { Theme, type Board } from "@/types"
import { Separator } from "./ui/separator";
import List from "./List";
import { Ellipsis, Plus } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBoardsStore } from "@/utils/boards";
import DialogBoardTheme from "./DialogBoardTheme";
import DialogBoardTitle from "./DialogBoardTitle";
import { themes } from "@/consts";
import DialogBoardDelete from "./DialogBoardDelete";
import DialogAddList from '@/components/DialogAddList'

export type ThemeOptionType = {
  id: Theme;
  component: JSX.Element;
}

const Board = () => {
  const { boards, setBoard: setNewBoard, removeBoard } = useBoardsStore()
  const { boardId } = useParams()
  const [titleMenuOpen, setTitleMenuOpen] = useState(false)
  const [themeMenuOpen, setThemeMenuOpen] = useState(false)
  const [removeMenuOpen, setRemoveMenuOpen] = useState(false)
  const [board, setBoard] = useState<Board>(boards.find(board => board.id === boardId)!)
  const [title, setTitle] = useState<string>(board.title)
  const [theme, setTheme] = useState<Theme>(board.theme)
  const [remove, setRemove] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const newBoard = {
      ...board,
      title,
      theme
    }

    setBoard(newBoard)
    setNewBoard(newBoard)
  }, [title, theme])

  useEffect(() => {
    if (!remove || !boardId) return

    removeBoard(boardId)
    navigate('/')
  }, [remove])

  useEffect(() => {
    setTitle(board.title)
    setTheme(board.theme)
  }, [board])

  useEffect(() => {
    setBoard(boards.find(board => board.id === boardId)!)
  }, [boardId])

  return (
    <>
      <DialogBoardTheme open={themeMenuOpen} setOpen={setThemeMenuOpen} setTheme={setTheme} />
      <DialogBoardTitle open={titleMenuOpen} setOpen={setTitleMenuOpen} setTitle={setTitle} />
      <DialogBoardDelete open={removeMenuOpen} setOpen={setRemoveMenuOpen} setDelete={setRemove} />

      <section className="w-full h-full bg-cover relative overflow-hidden">
        {/* Tema */}
        <div className="w-screen h-full absolute">
          {themes.find(themeOption => themeOption.id === theme)?.component}
        </div>

        <div className="absolute top-0 left-0 h-[calc(100vh-9.1rem)] w-full">
          <div
            id="board-header"
            className="w-full h-20 flex items-center justify-between p-4 bg-slate-800 bg-opacity-80 text-primary-foreground"
          >
            <h2 className="pl-4 font-medium text-2xl">{title}</h2>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="p-1 hover:bg-slate-400 hover:bg-opacity-40 rounded-sm cursor-pointer">
                  <Ellipsis size={24} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  Board
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setTitleMenuOpen(true)} className="cursor-pointer">
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setThemeMenuOpen(true)} className="cursor-pointer">
                  Change Theme
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRemoveMenuOpen(true)} className="cursor-pointer">
                  <span className="text-destructive">Remove</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Separator />

          <div
            id="board-content"
            className="flex gap-4 p-4 overflow-x-scroll h-full w-full"
          >
            {board.lists.map(list => (
              <List key={`list-${list.id}`} list={list} boardName={board.title} />
            ))}

            <DialogAddList boardId={board.id}>
              <div
                id="add-list"
                className="min-w-52 h-fit bg-primary rounded-lg p-4 flex justify-between text-primary-foreground hover:opacity-50 cursor-pointer gap-2"
              >
                <h3 className="font-semibold">Añadir lista</h3>
                <Plus />
              </div>
            </DialogAddList>
          </div>
        </div>

      </section>
    </>
  )
}

export default Board