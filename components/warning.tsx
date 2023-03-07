export default function Warning() {

    return (
        <div className="alert alert-info my-2">
            ⚠️ Warning ⚠️ <br/>
If you use a custom domain, it breaks login on the current app. We’re working on it, but until the fix is out you’ll have to login with your email. 
<br/>
Only poke around on this if you’re comfortable with some rough edges!
        </div>
    )
}