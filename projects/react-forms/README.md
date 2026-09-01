handleChange handler
const handleChange = (event) => {
const { name, value, type, checked } = event.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

};

explaination ::
Yes — this is one of the most important patterns in React forms, especially when you have 5, 10, or 20 inputs.

Let's break it down slowly.

1. The problem: handling 5 inputs separately

Imagine your form has:

<input type="text" />
<input type="email" />
<input type="password" />
<select />
<select />

You could create separate state variables:

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [gender, setGender] = useState("");
const [country, setCountry] = useState("");

And then 5 separate handlers:

const handleNameChange = (event) => {
setName(event.target.value);
};

const handleEmailChange = (event) => {
setEmail(event.target.value);
};

const handlePasswordChange = (event) => {
setPassword(event.target.value);
};

const handleGenderChange = (event) => {
setGender(event.target.value);
};

const handleCountryChange = (event) => {
setCountry(event.target.value);
};

Then your JSX becomes:

<input
  value={name}
  onChange={handleNameChange}
/>

<input
  value={email}
  onChange={handleEmailChange}
/>

<input
  value={password}
  onChange={handlePasswordChange}
/>

<select
  value={gender}
  onChange={handleGenderChange}
/>

<select
  value={country}
  onChange={handleCountryChange}
/>
😩 That's a lot of code.

And imagine you have 15 inputs.

You'd potentially have 15 pieces of state + 15 handlers.

2. The better approach: one object

Instead, we put everything inside one state object:

const [formData, setFormData] = useState({
name: "",
email: "",
password: "",
gender: "",
country: "",
});

Now our entire form data lives here:

formData
│
├── name
├── email
├── password
├── gender
└── country

So:

formData.name

gives the name.

formData.email

gives the email.

And so on.

3. Now comes the clever part

We create ONE handler:

const handleChange = (event) => {
const { name, value } = event.target;

setFormData({
...formData,
[name]: value,
});
};

And every input uses it:

<input
  name="name"
  value={formData.name}
  onChange={handleChange}
/>

<input
  name="email"
  value={formData.email}
  onChange={handleChange}
/>

<input
  name="password"
  value={formData.password}
  onChange={handleChange}
/>

<select
  name="gender"
  value={formData.gender}
  onChange={handleChange}
/>

<select
  name="country"
  value={formData.country}
  onChange={handleChange}
/>

One handler handles everything. 🔥

4. But how does React know which input changed?

This is where:

name="email"

becomes extremely important.

Suppose you type:

abc@gmail.com

into:

<input
  name="email"
  value={formData.email}
  onChange={handleChange}
/>

React gives our function an event.

Inside the event:

event.target.name

is:

"email"

And:

event.target.value

is:

"abc@gmail.com"

So:

const { name, value } = event.target;

essentially gives us:

name = "email";
value = "abc@gmail.com"; 5. Now look at this 👇
[name]: value

This is the magic.

Because:

name = "email"

JavaScript converts:

[name]: value

into:

email: "abc@gmail.com"

So:

setFormData({
...formData,
[name]: value,
});

becomes conceptually:

setFormData({
...formData,
email: "abc@gmail.com",
}); 6. What if the user types in the name?

Suppose:

<input
  name="name"
  value={formData.name}
  onChange={handleChange}
/>

User types:

Nikhil

Then:

event.target.name

=

"name"

and:

event.target.value

=

"Nikhil"

Therefore:

[name]: value

becomes:

name: "Nikhil"

So the state becomes:

{
name: "Nikhil",
email: "",
password: "",
gender: "",
country: ""
} 7. Then user enters email

Now:

event.target.name = "email"
event.target.value = "abc@gmail.com"

Our same handler:

setFormData({
...formData,
[name]: value,
});

updates:

{
name: "Nikhil",
email: "abc@gmail.com",
password: "",
gender: "",
country: ""
}

Same function.

No new handler.

8. What does ...formData do?

This is also very important.

Suppose our current state is:

{
name: "Nikhil",
email: "abc@gmail.com",
password: "",
gender: "",
country: ""
}

We want to change only password.

If we did:

setFormData({
password: "123456"
});

we'd replace the entire object with:

{
password: "123456"
}

😬 We'd lose name, email, gender, country.

That's why we do:

setFormData({
...formData,
password: "123456"
});

...formData copies the existing values.

Then password gets updated.

Result:

{
name: "Nikhil",
email: "abc@gmail.com",
password: "123456",
gender: "",
country: ""
} 9. So the entire mechanism is

Imagine:

<input
  name="email"
  value={formData.email}
  onChange={handleChange}
/>

User types:

hello@gmail.com

↓

React fires:

handleChange(event)

↓

We get:

event.target.name
// "email"

event.target.value
// "hello@gmail.com"

↓

Then:

setFormData({
...formData,
[name]: value
});

↓

Which effectively means:

setFormData({
...formData,
email: "hello@gmail.com"
});

🔥 That's the entire trick.

10. What about the checkbox?

This is why our original code had:

const { name, value, type, checked } = event.target;

Normal input:

event.target.value

works.

But checkbox uses:

event.target.checked

For example:

<input
  type="checkbox"
  name="terms"
  checked={formData.terms}
  onChange={handleChange}
/>

When checked:

event.target.checked
// true

When unchecked:

event.target.checked
// false

So we use:

[name]: type === "checkbox" ? checked : value

Meaning:

Is this a checkbox?
↓
YES → use checked
↓
NO → use value 11. Final version

So our complete handler:

const handleChange = (event) => {
const { name, value, type, checked } = event.target;

setFormData({
...formData,
[name]: type === "checkbox" ? checked : value,
});
};

can handle:

Name → value
Email → value
Password → value
Gender → value
Country → value
Terms → checked

with ONE function.

🧠 Interview answer

If an interviewer asks:

"How do you handle multiple form inputs in React?"

You can say:

"I generally maintain the form fields in a single state object and use a common onChange handler. Each input has a unique name attribute, and I use event.target.name to determine which field changed and event.target.value to update that field. I spread the previous state so the other fields aren't lost."

That's a very solid React interview answer.

And the key pieces to understand are:

name="email"

↓

event.target.name

↓

[name]: value

↓

...formData

Once these four make sense, you've understood the main pattern behind handling multiple React form inputs.
