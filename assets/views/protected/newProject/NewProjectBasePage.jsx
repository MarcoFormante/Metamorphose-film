import React from 'react'

const NewProjectBasePage = ({
    setProjectName,
    setAbrName,
    setMadeBy,
    setYoutubeLink,
    setCollab,
    setBgVideo,
    projectName,
    abrName,
    madeBy,
    youtubeLink,
    collab,
    bgVideo,
    slug,
    setSlug
}) => {
  return (
    <div>
        <div className='inpt-container'>
            <label htmlFor='p-name'>Nom du projet</label>
            <input type='text' required id='p-name' name='p-name' value={projectName} onInput={(e)=>setProjectName(e.target.value)} placeholder='ex. heliopolis' />
          </div>
          
          <div className='inpt-container'>
            <label htmlFor='p-name-abr'>Nom pour petits ecrans</label>
            <input type='text' required id='p-name-abr' name='p-name-abr' value={abrName} onInput={(e)=>setAbrName(e.target.value)} />
          </div>

          <div className='inpt-container'>
            <label htmlFor='p-slug'>{"URL-(SLUG)"}</label>
            <input type='text' required id='p-slug' name='p-slug' placeholder={'ex. heliopolis (tout minuscule) ou Ciel-Heither (avec le trait - pour l\'espace)'} value={slug} onInput={(e)=>setSlug(e.target.value)} />
          </div>

          <div className='inpt-container'>
            <label htmlFor='p-staff-madeby'>Realisé par</label>
            <input type='text' required id='p-staff-madeby' name='p-staff-madeby'  value={madeBy} onChange={(e)=>setMadeBy(e.target.value)} />
          </div>

          <div className='inpt-container'>
            <label htmlFor='p-ytb'>YouTube Link</label>
            <input type='text' required id='p-ytb' value={youtubeLink} onInput={(e)=>setYoutubeLink(e.target.value)} name='p-ytb'/>
          </div>

          <div className='inpt-container'>
            <label htmlFor='p-coll'>Collab avec</label>
            <input type='text' required id='p-coll' value={collab} onInput={(e)=>setCollab(e.target.value)} name='p-coll'/>
          </div>

          <div className='inpt-container'>
            <label htmlFor='p-bg-v'>BG video</label>
            <input type='file' required id='p-bg-v' name='p-bg-v' accept='.mp4' onChange={(e)=>setBgVideo(e.target.files[0])}/>
          </div>

        { bgVideo && <video width={300} height={200} controls src={URL.createObjectURL(bgVideo)}></video>}
        </div>
        
    )}

export default NewProjectBasePage