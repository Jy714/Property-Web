import React, { useEffect, useState } from 'react'
import { assets, projectsData } from '../assets/assets'

const Projects = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length)
   }

  const prevProject = () => {
    // 如果prevIndex == 0的时候 我们就要把Index 拉去projectData长度-1的位置
    setCurrentIndex((prevIndex) => prevIndex === 0 ? projectsData.length - 1 : prevIndex-1)
  }

  setInterval(() => {nextProject},10000)

  useEffect(() => { 
    const updateCardsToShow = () => {
      if (window.innerWidth >= 1024) {
        setCardsToShow(projectsData.length)
      } else {
        setCardsToShow(1);
      }
    }

      updateCardsToShow();

      window.addEventListener('resize', updateCardsToShow);
      return () => window.removeEventListener('resize', updateCardsToShow);

  },[])
  
  return (
    <div id='Projects' className='container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden'>

      <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>Projects <span className='underline underline-offset-4 decoration-1 under font-light'>Completed</span></h1>
      <p className='text-gray-500 max-w-80 mb-8 text-center mx-auto'>Crafting Spaces, Building Legacies—Explore Our Portfolio</p>

      {/* Slider buttons */}
      <div className='flex justify-end items-center mb-8'>
        <button onClick={prevProject} className='p-3 bg-gray-200 rounded mr-2' aria-label='Previous Project'>
          <img src={assets.left_arrow} alt="Previous" />
        </button>
        <button onClick={nextProject} className='p-3 bg-gray-200 rounded mr-2' aria-label='Next Project'>
          <img src={assets.right_arrow} alt="Next" />
        </button>
      </div>

      {/* Project Slider container */}
      <div className='overflow-hidden'>
        <div className='flex gap-8 transition-transform duration-500 ease-out' style={{transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)`}}>
          {projectsData.map((project, index) => (
            <div key={index} className='relative flex-shrink-0 w-full sm:w-1/4'>
              <img src={project.image} alt={project.title} className='w-full h-auto mb-14'/>

              <div className='absolute left-0 right-0 bottom-5 flex justify-center'>
                <div className='inline-block bg-white w-3/4 px-4 py-2 shadow-md'>
                  <h2 className='text-xl font-semibold text-gray-800'>
                    {project.title}
                  </h2>
                  <p className='text-gray-500 text-sm'>
                    {project.price} <span className='px-1'>|</span> { project.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Projects
