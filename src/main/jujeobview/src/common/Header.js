function Header() {
    return (
        <div className="Header">
            <h1> 주접 로고 </h1>
            <h3>{new Date().toDateString()}</h3>
        </div>
    )
}
export default Header;