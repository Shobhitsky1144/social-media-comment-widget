import React, { useState } from 'react';
import moment from 'moment';
import './App.css'

function App() {
  const [Apps, setApps] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [editText, setEditText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleApp = () => {
    if (replyText.trim() !== '') {
      const newApp = {
        id: Date.now(),
        text: replyText,
        replies: [],
     
        timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
      };

      setApps([...Apps, newApp]);
      setReplyText('');
    }
  };

  const handleReply = (appId) => {
    setShowReplyInput(appId);
  };

  const handleReplySubmit = (appId, replyText) => {
    if (replyText.trim() !== '') {
      const updatedApps = Apps.map((app) => {
        if (app.id === appId) {
          const newReply = {
            id: Date.now(),
            text: replyText,
            timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
          };
          return { ...app, replies: [...app.replies, newReply] };
        }
        return app;
      });

      setApps(updatedApps);
      setReplyText('');
      setShowReplyInput(false);
    }
  };

  const handleDelete = (appId, replyId) => {
    if (replyId) {
      const updatedApps = Apps.map((app) => {
        if (app.id === appId) {
          const updatedReplies = app.replies.filter((reply) => reply.id !== replyId);
          return { ...app, replies: updatedReplies };
        }
        return app;
      });

      setApps(updatedApps);
    } else {
      const updatedApps = Apps.filter((app) => app.id !== appId);
      setApps(updatedApps);
    }
  };

  const handleEdit = (appId, replyId) => {
    setEditId(replyId ? replyId : appId);
    setEditMode(true);
    if (replyId) {
      const app = Apps.find((app) => app.id === appId);
      const reply = app.replies.find((reply) => reply.id === replyId);
      setEditText(reply.text);
    } else {
      const app = Apps.find((app) => app.id === appId);
      setEditText(app.text);
    }
  };

  const handleEditSubmit = (appId, replyId, editedText) => {
    setEditMode(false);
    setEditId(null);
    if (editedText.trim() !== '') {
      const updatedApps = Apps.map((app) => {
        if (app.id === appId) {
          if (replyId) {
            const updatedReplies = app.replies.map((reply) => {
              if (reply.id === replyId) {
                return { ...reply, text: editedText };
              }
              return reply;
            });
            return { ...app, replies: updatedReplies };
          } else {
            return { ...app, text: editedText };
          }
        }
        return app;
      });

      setApps(updatedApps);
      setEditText('');
    }
  };

  return (
    <div>
  <h1 style={{color:'purple'}}>Comment Widget</h1>
      <div>
        <input type="text" value={replyText} onChange={(e) => setReplyText(e.target.value)} />
        <button className='btn-primary' onClick={handleApp}>ADD COMMENT</button>
      </div>
      <div>
        {Apps.map((app) => (
          <div key={app.id}>
            {editMode && editId === app.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <>
                <h3 style={{color:'red'}}>{app.text}</h3> 
                <h4> {app.timestamp}</h4>
              </>
            )}
            <button  className='btn delete-btn' onClick={() => handleDelete(app.id)}>Delete</button>
            {editMode && editId === app.id ? (
              <button className='btn edit-btn' onClick={() => handleEditSubmit(app.id, null, editText)}>Save</button>
            ) : (
              <button className='btn edit-btn' onClick={() => handleEdit(app.id, null)}>Edit</button>
            )}
            <button className='btn reply-btn' onClick={() => handleReply(app.id)}>Reply</button>

            {app.replies.map((reply) => (
              <div key={reply.id} className="kk" style={{ marginLeft: '3rem' }}>
                {editMode && editId === reply.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  <>
                  <h3 style={{color:'red'}}>{reply.text}</h3> 
                  <h4> {reply.timestamp}</h4>
                </>
                )}
                <button className='btn delete-btn' onClick={() => handleDelete(app.id, reply.id)}>Delete</button>
                {editMode && editId === reply.id ? (
                  <button className='btn edit-btn' onClick={() => handleEditSubmit(app.id, reply.id, editText)}>
                    Save
                  </button>
                ) : (
                  <button className='btn edit-btn' onClick={() => handleEdit(app.id, reply.id)}>Edit</button>
                )}
                <button  className='btn reply-btn'onClick={() => handleReply(app.id)}>Reply</button>
              </div>
            ))}
            {showReplyInput === app.id && (
              <div>
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <button className='btn reply-btn' onClick={() => handleReplySubmit(app.id, replyText)}>Reply</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
