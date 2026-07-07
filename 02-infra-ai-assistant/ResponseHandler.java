import java.util.Random;

public class ResponseHandler {
    private Random random = new Random();
    
    private String[] defaultResponses = {
        "Interesting! Tell me more.",
        "I see. What do you think about that?",
        "That's cool! How does that relate to your studies?",
        "Hmm, I'm not sure. Can you rephrase?",
        "Sounds good! Anything else on your mind?"
    };
    
    public String generateResponse(String input) {
        if (input.contains("?")) {
            return "That's a great question!";
        }
        
        return defaultResponses[random.nextInt(defaultResponses.length)];
    }
}