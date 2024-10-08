'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BiChevronLeft, BiLoader } from "react-icons/bi";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { MagicWandIcon } from "@radix-ui/react-icons";


interface Flashcard {
    id: number;
    question: string;
    answer: string;
}

interface Topic {
    id: number;
    name: string;
    slug: string;
}


interface  aiCard {
    topic_name?: string;
    topic_slug?: string;
    desc?:string;
    num: number;
}


const DashboardFlashcards = () => {
    const router = useRouter();
    const { toast } = useToast();

    const [topics, setTopics] = useState<Topic[]>([]);
    const [aiCard, setAiCard] = useState<aiCard| null>(null);
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
    const [editedTopic, setEditedTopic] = useState<Topic | null>(null);

    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
    const [newQuestion, setNewQuestion] = useState("");
    const [newAnswer, setNewAnswer] = useState("");
    const [newTopicName, setNewTopicName] = useState("");

    const [loadingCT, setLoadingCT] = useState(false);
    const [loadingCF, setLoadingCF] = useState(false);
    const [loadingF, setLoadingF] = useState(false);
    const [loadingT, setLoadingT] = useState(false);

    const [loadingC, setLoadingC] = useState(false);
    const [loadingCardId, setLoadingCardId] = useState<number | null>(null);

    const [loadingGAI, setLoadingGAI] = useState(false);

    const handleGenerateAi = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingGAI(true);
        if (!selectedTopic) {
            console.error("No topic selected");
            return;
        }
        try {
            const response = await fetch("/api/flashcards/ai", {
                // cache:'no-store',
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    topic_slug: selectedTopic.slug,
                    topic_name: aiCard?.topic_name || selectedTopic.name,
                    description: aiCard?.desc,
                    number_of_flashcards: aiCard?.num || 4,
                }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const res = await response.json();

            setFlashcards([...flashcards, ...res.result]);
            toast({ title: "success", description: "Flashcards saved successfully" });
            setAiCard(null)
        } catch (error) {
            toast({ title: "Error", description: "Error creating flashcards" });
            console.error("Error creating flashcard:", error);
        } finally {
            setLoadingGAI(false);
            setAiCard(null)
        }
    };


    const handleCreateFlashcard = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingCF(true);
        if (!selectedTopic) {
            console.error("No topic selected");
            return;
        }
        try {
            const response = await fetch("/api/flashcards/create", {
                // cache:'no-store',
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    topicSlug: selectedTopic.slug,
                    question: newQuestion,
                    answer: newAnswer,
                }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const newCard = await response.json();
            setFlashcards([...flashcards, newCard]);
            toast({ title: "success", description: "Flashcard saved successfully" });
            setNewQuestion("");
            setNewAnswer("");
        } catch (error) {
            toast({ title: "Error", description: "Error creating flashcard" });
            console.error("Error creating flashcard:", error);
        } finally {
            setLoadingCF(false);
        }
    };

    const handleEdit = async () => {
        if (!editingCard) return;
        setLoadingC(true)
        try {
            const response = await fetch(
                `/api/flashcards/edit-card/${editingCard.id}`,
                {
                    // cache:'no-store',
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        question: editingCard.question,
                        answer: editingCard.answer,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            setFlashcards(
                flashcards.map((card) =>
                    card.id === editingCard.id ? editingCard : card
                )
            );
            toast({
                title: "Success",
                description: "Flashcard updated successfully",
            });
            setEditingCard(null);
            setLoadingC(false)
        } catch (error) {
            toast({ title: "Error", description: "Something went wrong!" });
            console.error("Error updating flashcard:", error);
        }
    };

    const handleDelete = async (id: number) => {
        setLoadingCardId(id)
        try {
            const response = await fetch(`/api/flashcards/delete-card/${id}`, {
                // cache:'no-store',
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            setFlashcards(flashcards.filter((card) => card.id !== id));
            toast({
                title: "Success",
                description: "Flashcard deleted successfully",
            });
            setLoadingCardId(null)
        } catch (error) {
            toast({ title: "Error", description: "Something went wrong!" });
            console.error("Error deleting flashcard:", error);
        }
    };

    const handleCreateTopic = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingCT(true);
        if (!newTopicName || newTopicName.trim() === "") {
            return null;
        }

        try {
            const response = await fetch("/api/flashcards/topics/create-topic", {
                // cache:'no-store',
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: newTopicName }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const newTopic = await response.json();
            setTopics([...topics, newTopic]);
            toast({ title: "Success", description: "Topic saved successfully" });
            setNewTopicName("");
        } catch (error) {
            console.error("Error creating topic:", error);
            toast({ title: "Error", description: "Error creating topic" });
        } finally {
            setLoadingCT(false);
        }
    };

    const handleEditTopic = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editedTopic) {
            return null;
        }

        try {
            const response = await fetch(`/api/flashcards/topics/edit-topic/${editedTopic.id}`,{
                    // cache:'no-store',
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: editedTopic.name }),
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const updatedTopic: Topic = await response.json();

            setTopics(
                topics.map((topic) =>
                    topic.id === editedTopic.id
                        ? { ...topic, name: updatedTopic.name, slug: updatedTopic.slug }
                        : topic
                )
            );

            setEditedTopic({
                ...editedTopic,
                name: updatedTopic.name,
                slug: updatedTopic.slug,
            });

            setSelectedTopic({
                ...editedTopic,
                name: updatedTopic.name,
                slug: updatedTopic.slug,
            });

            toast({ title: "Success", description: "Saved changes successfully" });
        } catch (error) {
            toast({ title: "Error", description: "Something went wrong!" });
            console.error("Error updating topic:", error);
        }
    };

    const handleDeleteTopic = async (id: number) => {
       
        try {
            const response = await fetch(`/api/flashcards/topics/delete-topic/${id}`, {
                    // cache:'no-store',
                    method: "DELETE",
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            setTopics(topics.filter((topic) => topic.id !== id));
            toast({ title: "Success", description: "Topic deleted successfully" });
            setSelectedTopic(null); 
        } catch (error) {
            toast({ title: "Error", description: "Something went wrong!" });
            console.error("Error deleting topic:", error);
        }
    };



    useEffect(() => {
        const fetchFlashcards = async () => {
          
            if (!selectedTopic) return;
            setLoadingF(true);

            try {
                const response = await fetch(`/api/flashcards?topicSlug=${selectedTopic.slug}`, {
                    //   cache:'no-store',
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setFlashcards(data);
            } catch (error) {
                console.error("Error fetching flashcards:", error);
            } finally {
                setLoadingF(false);
            }
        };

        setEditedTopic(selectedTopic);
        fetchFlashcards();
    }, [selectedTopic]);


    useEffect(() => {
        const fetchTopics = async () => {
            setLoadingT(true);
            try {
                const response = await fetch("/api/flashcards/topics", {
                    // cache:'no-store',
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setTopics(data);
            } catch (error) {
                console.error("Error fetching topics:", error);
            } finally {
                setLoadingT(false);
            }
        };

        fetchTopics();
    }, []);

    return (
        <div className="mx-auto p-4 bg-white dark:bg-black rounded-md shadow-sm flex flex-col gap-4 w-full">
            <h2
                onClick={() => router.back()}
                className="font-medium cursor-pointer flex items-center bg-accent p-2 pr-4 rounded-md w-fit"
            >
                <BiChevronLeft size={20} className="inline cursor-pointer w-fit p-0 " />{" "}
                Back
            </h2>

            <form onSubmit={handleCreateTopic} className="space-y-4">
                <h3 className="text-xl font-semibold">Create Topic</h3>
                <label className="block">
                    <span className="text-neutral-700  dark:text-neutral-300">
                        Topic Name
                    </span>
                </label>
                <Input
                    type="text"
                    value={newTopicName}
                    placeholder="eg., javascript"
                    onChange={(e) => setNewTopicName(e.target.value)}
                    className="mt-1 block py-6 w-full bg-accent/40 rounded-md shadow-sm sm:max-w-[80%] "
                    required
                />
                <button
                    type="submit"
                    className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600"
                    disabled={loadingCT}
                >
                    {loadingCT ? "Creating..." : "Create Topic"}
                </button>
            </form>

            {loadingT && (
                <div className="flex items-center gap-1">
                    <BiLoader size={20} className="animate-spin" /> loading topics...
                </div>
            )}

            {!loadingT && topics.length > 0 && (
                <div className="mt-4 w-fit">
                    <Select
                        onValueChange={(value) => {
                            setSelectedTopic(topics.find((topic) => topic.id === Number(value)) || null)                 
                        }}
                        value={(selectedTopic?.id)?.toString() || ''} >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue defaultChecked placeholder="Select a topic..." />
                        </SelectTrigger>
                        <SelectContent>
                            {topics?.map((topic) => (
                                <SelectItem key={topic.id} value={topic.id.toString()}>
                                    {topic.name}
                                </SelectItem>
                            ))}
                            <SelectItem key={'none'} value={"none"}>
                                {'None'}
                            </SelectItem>
                        </SelectContent>
                    </Select>
            
                </div>
            )}

            {selectedTopic && (
                <>
                    <div className="flex justify-between gap-4 items-center mt-4">
                        <h3 className="text-xl font-semibold">{selectedTopic.name}</h3>
                    </div>

                    {editedTopic && (
                        <div className="flex gap-2 items-center flex-wrap">
                            <form
                                onSubmit={handleEditTopic}
                                className="flex items-center gap-2 flex-wrap"
                            >
                                <Input
                                    type="text"
                                    value={editedTopic.name}
                                    placeholder="edit topic..."
                                    onChange={(e) =>
                                        setEditedTopic({ ...editedTopic, name: e.target.value })
                                    }
                                    className="block h-12 w-fit bg-accent/40 rounded-md shadow-sm"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="bg-rose-500 text-white px-4 h-12 border rounded-md hover:bg-rose-600"
                                >
                                    Save
                                </button>
                            </form>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (confirm("Are you sure you want to delete this topic?")) {
                                        handleDeleteTopic(selectedTopic.id);
                                    }
                                }}
                                className="bg-rose-500 text-white px-4 py-2 h-12 border rounded-md hover:bg-rose-600"
                            >
                                Delete
                            </button>
                        </div>
                    )}

                    <form onSubmit={handleCreateFlashcard} className="space-y-4 mt-4">
                        <h3 className="text-xl font-semibold ">
                            Create Flashcard for {selectedTopic.name}
                        </h3>
                        <Button type="button" variant={'secondary'} className="h-10 gap-2" onClick={()=>setAiCard({num:4})}>
                          <MagicWandIcon className="size-4 inline"/> Use AI to create
                        </Button>
                        <label className="block">
                            <span className="text-neutral-700 dark:text-neutral-300">
                                Question
                            </span>
                        </label>
                        <Input
                            type="text"
                            placeholder="eg., shortest program in js?"
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            className="mt-1 py-6 block w-full bg-accent/40 rounded-md sm:max-w-[80%] "
                            required
                        />
                        <label className="block">
                            <span className="text-neutral-700 dark:text-neutral-300">
                                Answer
                            </span>
                        </label>
                        <Textarea
                            placeholder="eg., empty program..."
                            value={newAnswer}
                            onChange={(e) => setNewAnswer(e.target.value)}
                            className="mt-1 block max-h-20 w-full bg-accent/40 rounded-md"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600"
                            disabled={loadingCF}
                        >
                            {loadingCF ? "Creating..." : "Create Flashcard"}
                        </button>
                    </form>

                    {loadingF && (
                        <div className="flex items-center gap-1">
                            <BiLoader size={20} className="animate-spin" /> loading
                            flashcards...
                        </div>
                    )}
                    {!loadingF && flashcards.length > 0 && (
                        <div className="mt-4 h-full">
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-fit">
                                {flashcards.map((card) => (
                                    <li
                                        key={card.id}
                                        className="p-4 
                bg-gradient-to-r
                from-neutral-200 via-white to-neutral-100
                 dark:from-neutral-900 dark:via-black dark:to-neutral-800
                 rounded-md h-full flex flex-col  justify-between"
                                    >
                                        <div>
                                            <h4 className=" font-medium">
                                                Front: <span className="text-sm font-normal">{card.question}</span>
                                            </h4>
                                            <p className="font-medium line-clamp-2 break-words">
                                                Back:{" "}
                                                <span className=" text-sm font-normal text-muted-foreground  ">
                                                    {card.answer}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="mt-4 flex space-x-2 text-foreground">
                                            <button
                                                onClick={() => setEditingCard(card)}
                                                className="bg-accent px-4 py-2 rounded-md"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(card.id)}
                                                className="bg-accent  px-4 py-2 rounded-md"
                                            >
                                             {(loadingCardId===card.id) && <BiLoader className="animate-spin inline"/>}   Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {editingCard && (
                        <div className="fixed sm:ml-[12rem] p-8 inset-0 flex  items-center justify-center bg-neutral-800 bg-opacity-90">
                            <div className="bg-white dark:bg-neutral-900 p-4 rounded-md shadow-lg min-w-64 max-w-lg w-full">
                                <h3 className="text-xl font-semibold mb-4">Edit Flashcard</h3>
                                <label className="block my-2">
                                    <span className="text-neutral-700 dark:text-neutral-300">
                                        Question
                                    </span>
                                </label>
                                <Input
                                    type="text"
                                    value={editingCard.question}
                                    onChange={(e) =>
                                        setEditingCard({ ...editingCard, question: e.target.value })
                                    }
                                    className="mt-1 block w-full bg-accent/40  rounded-md shadow-sm"
                                    required
                                />
                                <label className="block my-2">
                                    <span className="text-neutral-700 dark:text-neutral-300">
                                        Answer
                                    </span>
                                </label>
                                <Textarea
                                    value={editingCard.answer}
                                    onChange={(e) =>
                                        setEditingCard({ ...editingCard, answer: e.target.value })
                                    }
                                    className="mt-1 block max-h-20 w-full bg-accent/40  rounded-md shadow-sm"
                                    required
                                />
                                <div className="mt-4 flex space-x-2">
                                    <button
                                        onClick={handleEdit}
                                        className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600"
                                    >
                                        {loadingC && <BiLoader className="animate-spin inline"/>}  Save Changes
                                    </button>
                                    <button
                                        onClick={() => setEditingCard(null)}
                                        className="bg-neutral-500 text-white px-4 py-2 rounded-md hover:bg-neutral-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                  {aiCard && (
                        <div className="fixed sm:ml-[12rem] p-8 inset-0 flex  items-center justify-center bg-neutral-800 bg-opacity-90">
                            <div className="bg-white dark:bg-neutral-900 p-4 rounded-md shadow-lg min-w-64 max-w-lg w-full">
                                <h3 className="text-xl font-semibold mb-4">Create Flashcards</h3>
                        


                             <label className="block my-2">
                                    <span className="text-neutral-700 dark:text-neutral-300">
                                        Number of outputs
                                    </span>
                                </label>

                               <Input
                                    type="number"
                                    onChange={(e) =>
                                        setAiCard({ ...aiCard, num: Number(e.target.value) })
                                    }
                                    placeholder="eg; 4"
                                    className="mt-1  w-full bg-accent/40  rounded-md shadow-sm"
                                    required
                                />

                                <label className="block my-2">
                                    <span className="text-neutral-700 dark:text-neutral-300">
                                        Description 
                                    </span>
                                </label>

                                <Textarea
                                  
                                    onChange={(e) =>
                                        setAiCard({ ...aiCard, desc: e.target.value })
                                    }
                                    placeholder="eg.,  arrays and strings "
                                    className="mt-1 block max-h-20 w-full bg-accent/40  rounded-md shadow-sm"
                                    required
                                />
                                <div className="mt-4 flex space-x-2">
                                    <button
                                        onClick={handleGenerateAi}
                                        className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600"
                                    >
                                      {loadingGAI && <BiLoader className=" animate-spin inline"/>} Generate
                                    </button>

                                    <button
                                        onClick={() => setAiCard(null)}
                                        className="bg-neutral-500 text-white px-4 py-2 rounded-md hover:bg-neutral-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default DashboardFlashcards;
