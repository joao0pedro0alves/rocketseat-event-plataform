import { Link, useParams } from "react-router-dom"
import { isPast, format } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import clsx from "clsx"

import { CheckCircle, Lock } from "phosphor-react"

interface LessonProps {
    title: string
    slug?: string | null
    availableAt: Date
    type: "live" | "class"
}

export function Lesson(props: LessonProps) {
    const { slug } = useParams<{ slug: string }>()

    const isLessonAvailable = isPast(props.availableAt)

    const isLiveLesson = props.type === "live"

    const isActiveLesson = slug === props.slug

    const availableDataFormatted = format(
        props.availableAt,
        "EEEE' • 'd' de 'MMMM' • 'k'h'mm'",
        {
            locale: ptBR,
        }
    )

    return (
        <Link to={`/event/lesson/${props.slug}`} className="group">
            <span className="text-gray-300">{availableDataFormatted}</span>

            <div
                className={clsx(
                    "rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500",
                    { "bg-green-500": isActiveLesson }
                )}
            >
                <header className="flex items-center justify-between">
                    {isLessonAvailable ? (
                        <span
                            className={clsx(
                                "text-sm font-medium flex items-center gap-2",
                                {
                                    "text-white": isActiveLesson,
                                    "text-blue-500": !isActiveLesson,
                                }
                            )}
                        >
                            <CheckCircle size={20} />
                            Conteúdo liberado
                        </span>
                    ) : (
                        <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                            <Lock size={20} />
                            Em breve
                        </span>
                    )}

                    <span
                        className={clsx(
                            "text-xs rounded px-2 py-[0.125rem] text-white border font-bold",
                            {
                                "border-white": isActiveLesson,
                                "border-gray-300": !isActiveLesson,
                            }
                        )}
                    >
                        {isLiveLesson ? "AO VIVO" : "AULA PRÁTICA"}
                    </span>
                </header>

                <strong
                    className={clsx("mt-5 block", {
                        "text-white": isActiveLesson,
                        "text-gray-200": !isActiveLesson,
                    })}
                >
                    {props.title}
                </strong>
            </div>
        </Link>
    )
}
