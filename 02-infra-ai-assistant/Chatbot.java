import java.util.HashMap;
import java.util.Map;

public class Chatbot {
    private String name;
    private ResponseHandler responseHandler;
    
    private Map<String, String> responses = new HashMap<>();
    
    public Chatbot(String name) {
        this.name = name;
        this.responseHandler = new ResponseHandler();
        initializeResponses();
    }
    
    private void initializeResponses() {
        responses.put("hi", "Hello! How can I help you today?");
        responses.put("hello", "Hi there! Nice to meet you.");
        responses.put("hey", "Hey! What's up?");
        responses.put("assalamualaikum", "Wa Alaikum Assalam! How are you?");
        
        responses.put("name", "I'm " + name + ", your UET AI Assistant!");
        responses.put("who are you", "I'm " + name + ", build by Irfan.");
        
        responses.put("uet", "UET Peshawar is one of the best engineering universities in KPK!");
        responses.put("university", "UET Peshawar - Engineering the Future!");
        responses.put("peshawar", "UET Peshawar is located in beautiful Peshawar.");
        responses.put("department", "I'm specialized in helping CS students.");
        responses.put("cs", "Computer Science department! Great choice.");
        responses.put("semester", "2nd semester? OOP is one of the important courses.");

        responses.put("developer", "I was built by IRFAN ULLAH AMIN");
        responses.put("irfan", "Irfan is the student who built this chatbot for his OOP project");
        
        responses.put("oop", "Object Oriented Programming is fun! What concept are you stuck on?");
        responses.put("java", "Java is excellent for learning OOP. Need help with any topic?");
        responses.put("class", "In OOP, a class is a blueprint for objects.");
        responses.put("object", "Objects are instances of classes.");
        responses.put("inheritance", "Inheritance allows a class to inherit properties from another class.");
        responses.put("polymorphism", "Polymorphism means 'many forms' - method overriding and overloading.");
        responses.put("encapsulation", "Encapsulation is wrapping data and methods into a single unit.");
        responses.put("abstraction", "Abstraction hides complex implementation details.");
        
        responses.put("project", "This is your OOP semester project. I can help you improve it!");
        responses.put("gui", "Swing GUI looks good! You're on the right track.");
        responses.put("feature", "Good idea! You can add conversation history, file saving, or API integration.");
        
        responses.put("how are you", "I'm doing great, thanks! How about you?");
        responses.put("good", "Glad to hear that!");
        responses.put("bad", "Sorry to hear that. Want to talk about it?");
        responses.put("thank", "You're most welcome! Always happy to help.");
        responses.put("thanks", "You're welcome!");
        
        responses.put("joke", "Why do Java developers wear glasses? Because they don't C#!");
        responses.put("weather", "I don't have real-time weather, but I hope it's good in Peshawar!");
        responses.put("exam", "Best of luck for your exams! Study hard and stay consistent.");
        responses.put("bored", "Let's talk about OOP or your project to make it interesting!");
        
        responses.put("bye", "Goodbye! Have a great day!");
        responses.put("goodbye", "Take care! See you later.");
        responses.put("exit", "Bye! Come back anytime.");
    }
    
    public String greet() {
        return "Hello! I'm " + name + ". Ask me anything about UET or just chat!";
    }
    
    public String getGoodbye() {
        return "Take care! See you later 👋";
    }
    
    public String getResponse(String input) {
        String lowerInput = input.toLowerCase().trim();
        
        for (String key : responses.keySet()) {
            if (lowerInput.contains(key)) {
                return responses.get(key);
            }
        }
        
        return responseHandler.generateResponse(lowerInput);
    }
    
    public String getName() {
        return name;
    }
}