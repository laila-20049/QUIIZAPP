import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, HelpCircle, ChevronDown, ArrowLeft } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      category: "Général",
      questions: [
        {
          question: "Qu'est-ce que le Forum de Discussion ?",
          answer: "Le Forum de Discussion est un espace communautaire où les étudiants peuvent poser des questions, partager leurs connaissances, et s'entraider sur des sujets académiques variés. C'est un lieu d'échange et d'apprentissage collaboratif."
        },
        {
          question: "Qui peut utiliser le forum ?",
          answer: "Le forum est ouvert à tous les étudiants de notre plateforme. Vous n'avez pas besoin de créer un compte supplémentaire - utilisez simplement votre nom lorsque vous posez une question ou répondez."
        },
        {
          question: "Est-ce que mes données sont sauvegardées ?",
          answer: "Oui, toutes vos questions, réponses et commentaires sont stockés localement dans votre navigateur. Notez que si vous effacez les données de votre navigateur, vos contributions seront également supprimées."
        }
      ]
    },
    {
      category: "Poser des Questions",
      questions: [
        {
          question: "Comment poser une bonne question ?",
          answer: "Pour poser une bonne question : 1) Choisissez un titre clair et descriptif, 2) Expliquez votre problème en détail avec le contexte, 3) Mentionnez ce que vous avez déjà essayé, 4) Ajoutez des tags pertinents, 5) Relisez votre question avant de la publier."
        },
        {
          question: "Puis-je modifier ma question après l'avoir publiée ?",
          answer: "Actuellement, la modification des questions n'est pas disponible. Assurez-vous de bien relire votre question avant de la publier. Si vous devez apporter des corrections importantes, vous pouvez ajouter un commentaire sous votre question."
        },
        {
          question: "Combien de questions puis-je poser ?",
          answer: "Il n'y a pas de limite au nombre de questions que vous pouvez poser. N'hésitez pas à demander de l'aide chaque fois que vous en avez besoin !"
        },
        {
          question: "Quels types de questions sont acceptés ?",
          answer: "Toutes les questions liées aux études sont bienvenues : mathématiques, physique, chimie, informatique, langues, etc. Assurez-vous que vos questions sont respectueuses et appropriées pour un environnement académique."
        }
      ]
    },
    {
      category: "Répondre aux Questions",
      questions: [
        {
          question: "Comment répondre à une question ?",
          answer: "Pour répondre à une question, cliquez sur la question qui vous intéresse, lisez attentivement le contenu, puis utilisez le formulaire 'Votre réponse' en bas de la page. Entrez votre nom et votre réponse, puis cliquez sur 'Publier la réponse'."
        },
        {
          question: "Puis-je répondre à plusieurs questions ?",
          answer: "Absolument ! Vous êtes encouragé à partager vos connaissances autant que possible. Chaque contribution aide la communauté à grandir et à apprendre."
        },
        {
          question: "Qu'est-ce que le système de vote ?",
          answer: "Les réponses peuvent être votées positivement par les autres utilisateurs. Plus une réponse reçoit de votes, plus elle est considérée comme utile par la communauté. Cela aide à mettre en avant les meilleures réponses."
        }
      ]
    },
    {
      category: "Commentaires",
      questions: [
        {
          question: "Quelle est la différence entre une réponse et un commentaire ?",
          answer: "Une réponse est une solution complète ou une explication détaillée à la question posée. Un commentaire est une remarque courte pour demander des clarifications, suggérer des améliorations ou remercier l'auteur d'une réponse."
        },
        {
          question: "Puis-je commenter mes propres réponses ?",
          answer: "Oui, vous pouvez commenter vos propres réponses pour ajouter des précisions ou répondre aux questions des autres utilisateurs."
        }
      ]
    },
    {
      category: "Recherche et Navigation",
      questions: [
        {
          question: "Comment trouver des questions sur un sujet spécifique ?",
          answer: "Utilisez la barre de recherche en haut de la page d'accueil du forum. Vous pouvez rechercher par mots-clés, tags, ou titre de question. Vous pouvez également trier les questions par date (récentes) ou par popularité."
        },
        {
          question: "Que signifient les différentes couleurs des badges de réponses ?",
          answer: "Les badges de réponses changent de couleur selon le nombre de réponses : gris (0 réponses - pas encore de solution), bleu (1-2 réponses - discussion en cours), vert (3+ réponses - bonne discussion)."
        }
      ]
    },
    {
      category: "Bonnes Pratiques",
      questions: [
        {
          question: "Quelles sont les règles de conduite du forum ?",
          answer: "Soyez respectueux envers tous les membres, utilisez un langage approprié, ne partagez pas de contenu offensant ou inapproprié, ne faites pas de spam, et respectez la propriété intellectuelle. L'objectif est de créer un environnement d'apprentissage positif pour tous."
        },
        {
          question: "Comment puis-je remercier quelqu'un pour sa réponse ?",
          answer: "Vous pouvez remercier un utilisateur en votant positivement pour sa réponse (cliquez sur l'icône pouce levé) ou en laissant un commentaire de remerciement."
        },
        {
          question: "Que faire si je trouve du contenu inapproprié ?",
          answer: "Si vous rencontrez du contenu inapproprié, veuillez contacter les administrateurs de la plateforme via la page de contact. Fournissez autant de détails que possible pour nous aider à résoudre le problème rapidement."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/forum"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Retour au forum
          </Link>
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <HelpCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Foire Aux Questions (FAQ)
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Trouvez rapidement des réponses à vos questions
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            Accès Rapide
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {faqData.map((category, index) => (
              <button
                key={index}
                onClick={() => {
                  const element = document.getElementById(`category-${index}`);
                  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-sm font-medium"
              >
                {category.category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqData.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              id={`category-${categoryIndex}`}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((item, questionIndex) => {
                  const globalIndex = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openIndex === globalIndex;
                  
                  return (
                    <div
                      key={questionIndex}
                      className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(globalIndex)}
                        className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                      >
                        <span className="font-semibold text-gray-900 dark:text-white pr-4">
                          {item.question}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0 transition-transform ${
                            isOpen ? 'transform rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 py-4 bg-white dark:bg-gray-800">
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">
            Vous n'avez pas trouvé votre réponse ?
          </h3>
          <p className="mb-6 text-blue-100">
            N'hésitez pas à poser votre question sur le forum. Notre communauté sera ravie de vous aider !
          </p>
          <Link
            to="/forum/ask"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
          >
            <MessageSquare className="h-5 w-5" />
            Poser une question
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
