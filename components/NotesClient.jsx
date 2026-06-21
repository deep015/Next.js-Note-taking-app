"use client"
import React, { useState } from 'react'
import toast from 'react-hot-toast';



const NotesClient = ({intialNotes}) => {
  const [notes,setNotes]=useState(intialNotes ?? []);
  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");
  const [loading,setLoading]=useState(false);

  const createNote = async(e)=>{
  e.preventDefault();

  if(!title.trim() || !content.trim()) return ;
  setLoading(true)
  try {
    const response = await fetch("/api/notes",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({title,content})
    })
    const result = await response.json();
    if(result.success){
      setNotes([result.data,...notes]);
      toast.success("Note Created Successfully");
      setTitle("");
      setContent("");
    }
    setLoading(false)
  } catch (error) {
    console.error(error)
    toast.error("Failed to create note")
  }

}
  return (
    <div className="space- y-6">
      <form onSubmit={createNote} className=' p-6 rounded-lg shadow-md'>
         <h2 className='text-xl text-gray-500 font-semibold mb-4'>
            Create New Note
         </h2>
         <div className='space-y-4'>
            <input type="text"
            placeholder='Note Title'
            required
            onChange={(e)=>setTitle(e.target.value)}
         className='w-full p-3 border text-sm text-shadow-gray-700 border-gray-800 rounded-md focus:border-blue-500'/>
            <textarea type="text"
            placeholder='Note Content'
            required
            onChange={(e)=>setContent(e.target.value)}
            className='w-full p-3 border text-sm  text-shadow-gray-700 border-gray-800 rounded-md focus:border-blue-500' />

            <button type='submit' className='bg-blue-500 text-white px-6 py-2
            rounded-md hover:bg-blue-600 disabled:opacity-50'>
            {
              loading ?'creating...':'create note'
            }
            </button>
         </div>
      </form>
      <div className='space-y-4'>
            <h2 className='text-xl text-gray-500 font-semibold mb-4'> 
              Your Notes ({notes.length})
               </h2>
               {
                notes.length=== 0 ? (<p> No Notes Yet .create Your First Note
                   Above</p>) :( notes.map((note)=>(
                  <div key={note._id} className='bg-white rounded-lg shadow-md p-4'> 
                    <div className='flex justify-between items-start mb-2 '> 
                      <h3 className='text-lg font-semibold'>{note.title}</h3>
                      <div className='flex gap-2'>
                        <button className='text-shadow-blue-500 hover:text-blue-700 text-sm'>Edit</button>
                        <button className='text-shadow-red-500 hover:text-red-700 text-sm'>Delete</button>
                      </div>
                    </div>
                    <p  className='text-gray-700 mb-2'>{note.content}</p>
                    <p className='text-gray-500 text-sm'> 
                    created:{new Date(note.createdAt).toLocaleDateString()}
                    </p>
                    { note.updatedAt !== note.createdAt &&(<p className='text-gray-500 text-sm'> 
                    created:{new Date(note.createdAt).toLocaleDateString()}
                    </p>)}
                  </div>
                )))
               }
      </div>
      
    </div>
  )
}

export default NotesClient