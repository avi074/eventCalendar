function App() {
  return (
    <>
      <div className="w-full h-full border shadow-md shadow-foreground rounded-md flex items-center">
        <div id='calendar-view' className="w-2/3 border-r"></div>
        <div id='side-panel' className="w-1/3 border-l overflow-y-auto"></div>
      </div>
    </>
  )
}

export default App
