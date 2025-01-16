import React from 'react'

const Profile = () => {

  
  return (
    <div>

      <form onSubmit={handleUplaodImage}>
        <input type="file" accept='images/*' />
        <button type='submit'>Upload</button>
      </form>

    </div>
  )
}

export default Profile