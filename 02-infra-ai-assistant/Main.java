import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Chatbot chatbot = new Chatbot("INFRA");
        
        System.out.println("=========================================");
        System.out.println("   Welcome to " + chatbot.getName() + "!");
        System.out.println("   (Type 'bye' to exit)");
        System.out.println("=========================================");
        
        System.out.println(chatbot.greet());
        
        while (true) {
            System.out.print("\nYou: ");
            String userInput = scanner.nextLine().trim();
            
            if (userInput.equalsIgnoreCase("bye") || 
                userInput.equalsIgnoreCase("exit") || 
                userInput.equalsIgnoreCase("quit")) {
                System.out.println(chatbot.getGoodbye());
                break;
            }
            String response = chatbot.getResponse(userInput);
            System.out.println(chatbot.getName() + ": " + response);
        }
        
        scanner.close();
    }
}