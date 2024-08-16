import React, { useState, useEffect } from "react"
import Head from "next/head"
import { useTheme } from "next-themes"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Smile,
  Wrench,
  AlertTriangle,
  PaperclipIcon,
  Mic,
  FileText,
  Sun,
  Moon
} from "lucide-react"

const AIAssistant = () => {
  const [searchText, setSearchText] = useState("")
  const [keywords, setKeywords] = useState([])
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const handleSearch = async () => {
    try {
      const response = await fetch("/api/keyword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: searchText })
      })
      const data = await response.json()
      setKeywords(data.keywords)
    } catch (error) {
      console.error("Error:", error)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white dark:bg-[#19191C] text-black dark:text-white p-8 transition-colors duration-200">
      <Head>
        <title>AI Assistant with Keyword Search</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Tabs defaultValue="creative">
            <TabsList>
              <TabsTrigger value="creative">Creative</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="precise">Precise</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
        </div>

        <div className="text-center mb-8">
          <div className="inline-block bg-pink-200 dark:bg-pink-800 rounded-full p-2 mb-4">
            <div className="w-16 h-16 bg-blue-300 dark:bg-blue-700 rounded-full flex items-center justify-center">
              <span className="text-4xl">😊</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold">How can I help you today?</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <FeatureCard
            icon={<Smile className="w-6 h-6" />}
            title="Examples"
            items={[
              "Explain quantum computing in simple terms",
              "Got any creative ideas for a 10 year old' birthday?",
              "How do I make an HTTP request in Javascript?"
            ]}
          />
          <FeatureCard
            icon={<Wrench className="w-6 h-6" />}
            title="Capabilities"
            items={[
              "Remembers what user said earlier in the conversation",
              "Allows user to provide follow-up corrections",
              "Trained to decline inappropriate requests"
            ]}
          />
          <FeatureCard
            icon={<AlertTriangle className="w-6 h-6" />}
            title="Limitations"
            items={[
              "May occasionally generate incorrect information",
              "May occasionally produce harmful instructions or biased information.",
              "Limited knowledge of world and events after April 2023"
            ]}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <SuggestionButton
            text="Create a blog post about NextUI"
            subtext="explain it in simple terms"
          />
          <SuggestionButton
            text="Give me 10 ideas for my next blog post"
            subtext="include only the best ideas"
          />
          <SuggestionButton
            text="Compare NextUI with other UI libraries"
            subtext="be as objective as possible"
          />
          <SuggestionButton
            text="Write a text message to my friend"
            subtext="be polite and friendly"
          />
        </div>

        <div className="relative mb-6">
          <Input
            className="w-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700 pl-4 pr-32 py-6"
            placeholder="Enter a prompt here"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
            <Button variant="ghost" size="icon">
              <PaperclipIcon className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Mic className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <FileText className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <Button
          onClick={handleSearch}
          className="w-full bg-cyan-500 dark:bg-cyan-700 text-white py-2 px-4 rounded-md hover:bg-cyan-600 dark:hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-700 focus:ring-opacity-50 mb-6"
        >
          搜索关键词
        </Button>

        {keywords.length > 0 && (
          <Card className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-2">提取的关键词:</h2>
              <ul className="list-disc pl-5">
                {keywords.map((keyword, index) => (
                  <li key={index} className="mb-1">
                    {keyword}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

const FeatureCard = ({ icon, title, items }) => (
  <Card className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700">
    <CardContent className="p-6">
      <div className="flex items-center mb-4">
        {icon}
        <h2 className="text-lg font-semibold ml-2">{title}</h2>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-sm"
          >
            {item}
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
)

const SuggestionButton = ({ text, subtext }) => (
  <Button
    variant="outline"
    className="h-auto py-2 px-4 justify-start text-left"
  >
    <div>
      <div className="font-medium">{text}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{subtext}</div>
    </div>
  </Button>
)

export default AIAssistant
